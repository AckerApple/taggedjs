import { DisplaySubject, TagSubject } from "./Tag.utils.js"
import { TagSupport } from "./TagSupport.class.js"
import { Subject } from "./Subject.js"
import { TemplateRedraw, TemplaterResult } from "./templater.utils.js"
import { isSubjectInstance, isTagArray, isTagComponent } from "./isInstance.js"
import { bindSubjectCallback } from "./bindSubjectCallback.function.js"
import { Tag } from "./Tag.class.js"
import { InterpolateSubject, processTag } from "./processSubjectValue.function.js"
import { TagArraySubject, processTagArray } from "./processTagArray.js"
import { updateExistingTagComponent } from "./updateExistingTagComponent.function.js"
import { updateExistingTag } from "./updateExistingTag.function.js"
import { RegularValue, processRegularValue } from "./processRegularValue.function.js"
import { checkDestroyPrevious } from "./checkDestroyPrevious.function.js"

export function updateExistingValue(
  subject: InterpolateSubject,
  value: TemplaterResult | Tag[] | TagSupport | Function | Subject<any>,
  ownerTag: Tag,
): void {
  const subjectValue = (subject as Subject<Tag>).value // old value
  const subjectSubArray = subject as TagArraySubject
  const subjectSubTag = subject as TagSubject
  const isChildSubject = subjectSubArray.isChildSubject
  const isComponent = isTagComponent(value)
  
  // If we are working with tag component 2nd argument children, the value has to be digged
  if(isChildSubject) {
    value = (value as any).value // A subject contains the value
  }
  
  checkDestroyPrevious(subject, value)

  // handle already seen tag components
  if(isComponent) {
    return updateExistingTagComponent(
      ownerTag,
      value as TemplateRedraw, // latest value
      subjectSubTag,
      subjectValue, // old value
    )
  }
  
  // was component but no longer
  const subjectTag = subjectSubTag.tag
  if(subjectTag) {
    handleStillTag(
      subjectTag as Tag,
      subject as TagSubject | TagArraySubject,
      value,
      ownerTag
    )

    return
  }

  // its another tag array
  if(isTagArray(value)) {
    const insertBefore = subjectSubArray.template || subjectSubTag.tag?.tagSupport.templater.insertBefore

    const nextClones = processTagArray(
      subject as TagArraySubject,
      value as any as Tag[],
      insertBefore,
      ownerTag,
      {counts: {
        added: 0,
        removed: 0,
      }}
    )

    ownerTag.clones.push(...nextClones)

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
  
  subjectSubTag.set(value) // let ValueSubject now of newest value

  return
}

function handleStillTag(
  existingTag: Tag,
  existing: InterpolateSubject,
  value: TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue,
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
