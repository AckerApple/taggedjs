import { DisplaySubject, TagSubject } from './Tag.utils'
import { TagSupport } from './TagSupport.class'
import { Subject } from './Subject'
import { TemplateRedraw, TemplaterResult } from './templater.utils'
import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { bindSubjectCallback } from './bindSubjectCallback.function'
import { Tag } from './Tag.class'
import { InterpolateSubject, processTag } from './processSubjectValue.function'
import { TagArraySubject, processTagArray } from './processTagArray'
import { updateExistingTagComponent } from './updateExistingTagComponent.function'
import { updateExistingTag } from './updateExistingTag.function'
import { RegularValue, processRegularValue } from './processRegularValue.function'
import { checkDestroyPrevious } from './checkDestroyPrevious.function'

type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag

export function updateExistingValue(
  subject: InterpolateSubject,
  value: ExistingValue,
  ownerTag: Tag,
): void {
  const subjectSubArray = subject as TagArraySubject
  const subjectSubTag = subject as TagSubject
  const isChildSubject = subjectSubArray.isChildSubject
  const isComponent = isTagComponent(value)
  
  // If we are working with tag component 2nd argument children, the value has to be digged
  if(isChildSubject) {
    value = (value as any).value // A subject contains the value
  }

  const oldInsertBefore = (subject as DisplaySubject).template || subjectSubTag.tag?.tagSupport.templater.insertBefore || (subjectSubTag as DisplaySubject).clone
  
  checkDestroyPrevious(subject, value)

  // handle already seen tag components
  if(isComponent) {
    if(!subjectSubTag.tag) {
      const templater = value as TemplaterResult
      const {retag} = templater.renderWithSupport(
        (value as TemplaterResult).tagSupport,
        undefined,
        ownerTag,
      )
      
      templater.newest = retag
      templater.oldest = retag
      subjectSubTag.tag = retag
      subjectSubTag.tagSupport = retag.tagSupport

      retag.buildBeforeElement(oldInsertBefore, {
        forceElement: true,
        counts: {added: 0, removed: 0},
      })

      return
    }

    return updateExistingTagComponent(
      ownerTag,
      value as TemplateRedraw, // latest value
      subjectSubTag,
    )
  }
  
  // was component but no longer
  const subjectTag = subjectSubTag.tag
  if(subjectTag) {
    handleStillTag(
      subjectTag,
      subject as TagSubject | TagArraySubject,
      value,
      ownerTag
    )

    return
  }

  // its another tag array
  if(isTagArray(value)) {
    const insertBefore = subjectSubArray.template || subjectSubTag.tag?.tagSupport.templater.insertBefore

    processTagArray(
      subject as TagArraySubject,
      value as any as Tag[],
      insertBefore,
      ownerTag,
      {counts: {
        added: 0,
        removed: 0,
      }}
    )

    return 
  }

  // now its a function
  if(value instanceof Function) {
    subjectSubTag.set( bindSubjectCallback(value as any, ownerTag) )
    return
  }

  // we have been given a subject
  if(isSubjectInstance(value)) {
    subjectSubTag.set( (value as Subject<any>).value ) // let ValueSubject now of newest value
    return
  }
  
  if(isTagInstance(value)) {
    subjectSubTag.template = oldInsertBefore
  }

  // This will cause all other values to render
  subjectSubTag.set(value) // let ValueSubject now of newest value

  return
}

function handleStillTag(
  existingTag: Tag,
  existing: InterpolateSubject,
  value: ExistingValue,
  ownerTag: Tag,
) {
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = (value as any)?.wrapper
  const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original

  // TODO: We shouldn't need both of these
  const isSameTag = value && existingTag.lastTemplateString === (value as any).lastTemplateString
  const isSameTag2 = value && (value as any).getTemplate && existingTag.isLikeTag(value as any)

  if(isSameTag || isSameTag2) {
    return processTag(
      value,
      existing as TagSubject,
      (existing as any).template,
      ownerTag,// existingTag, // tag,
      {
        counts: {
          added: 0,
          removed: 0,
        }
      }
    )
  }
  
  if(wrapMatch) {
    return updateExistingTag(
      value as TemplaterResult,
      existingTag,
      existing as TagSubject,
    )
  }

  const subject = existing as DisplaySubject
  return processRegularValue(value as RegularValue, subject, subject.template)
}
