import { DisplaySubject, TagSubject, getSubjectFunction } from './Tag.utils'
import { TagSupport } from './TagSupport.class'
import { Subject } from './subject/Subject.class'
import { TemplaterResult } from './TemplaterResult.class'
import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagArraySubject, processTagArray } from './processTagArray'
import { updateExistingTagComponent } from './updateExistingTagComponent.function'
import { RegularValue, processRegularValue } from './processRegularValue.function'
import { checkDestroyPrevious } from './checkDestroyPrevious.function'
import { ValueSubject } from './subject/ValueSubject'
import { processSubjectComponent } from './processSubjectComponent.function'
import { isLikeTags } from './isLikeTags.function'
import { Callback, bindSubjectCallback } from './bindSubjectCallback.function'
import { applyFakeTemplater, processTag } from './processTag.function'
import { InsertBefore } from './Clones.type'

export type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag

export function updateExistingValue(
  subject: InterpolateSubject,
  value: ExistingValue,
  ownerTag: Tag,
  insertBefore: InsertBefore,
): InterpolateSubject {
  const subjectTag = subject as TagSubject
  const isComponent = isTagComponent(value)
  
  const global = subjectTag.tag?.tagSupport.templater.global
  const placeholderElm = global?.placeholderElm || global?.insertBefore || (subject as DisplaySubject).insertBefore
  const oldInsertBefore = placeholderElm || (subject as DisplaySubject).clone

  checkDestroyPrevious(subject, value, insertBefore)

  // handle already seen tag components
  if(isComponent) {
    const templater = value as TemplaterResult
  
    // When was something before component
    if(!subjectTag.tag) {
      processSubjectComponent(
        templater,
        subjectTag,
        oldInsertBefore as InsertBefore,
        ownerTag,
        {
          forceElement: true,
          counts: {added: 0, removed: 0},
        }
      )

      return subjectTag
    }

    templater.tagSupport = new TagSupport(
      // subjectTag.tag.tagSupport.ownerTagSupport,
      ownerTag.tagSupport,
      templater,
      subjectTag,
    )

    updateExistingTagComponent(
      ownerTag,
      templater, // latest value
      subjectTag,
      insertBefore,
    )

    return subjectTag
  }
  
  // was component but no longer
  const tag = subjectTag.tag
  if(tag) {
    handleStillTag(
      tag,
      subject as TagSubject | TagArraySubject,
      value as Tag,
      ownerTag
    )

    return subjectTag
  }

  // its another tag array
  if(isTagArray(value)) {
    processTagArray(
      subject as TagArraySubject,
      value as any as Tag[],
      oldInsertBefore as InsertBefore,
      ownerTag,
      {counts: {
        added: 0,
        removed: 0,
      }}
    )

    return subject
  }

  // now its a function
  if(value instanceof Function) {
    // const newSubject = getSubjectFunction(value, ownerTag)
    const bound = bindSubjectCallback(value as Callback, ownerTag)
    subject.set(bound)
    return subject
  }

  if(isTagInstance(value)) {
    // insertBefore = subjectTag.insertBefore as InsertBefore || insertBefore
    // const insertBefore = oldInsertBefore as InsertBefore
    // delete subjectTag.tag?.tagSupport.templater.global.placeholderElm
    if(insertBefore.nodeName !== 'TEMPLATE') {
      console.log('subject', {
        insertBefore,
        subInsertBefore: (subject as any).insertBefore,
        clone: (subject as any).clone,
        iParent: insertBefore.parentNode,
        subParent: (subject as any).insertBefore.parentNode,
      })
      throw new Error(`expected template - ${insertBefore.nodeName}`)
    }

    processTag(
      value as Tag,
      subjectTag,
      insertBefore,
      ownerTag, // existingTag, // tag,
    )
    return subjectTag
  }

  // we have been given a subject
  if(isSubjectInstance(value)) {
    return value as ValueSubject<any>
  }

  // This will cause all other values to render
  processRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    oldInsertBefore as InsertBefore,
  )

  return subjectTag
}

function handleStillTag(
  existingTag: Tag,
  subject: InterpolateSubject,
  value: Tag | TemplaterResult | RegularValue,
  ownerTag: Tag,
) {
  // TODO: We shouldn't need both of these
  const isSameTag = value && isLikeTags(existingTag, value as Tag)
  const isSameTag2 = value && (value as any).getTemplate && existingTag.isLikeTag(value as any)

  const tag = value as Tag

  if(!tag.tagSupport) {
    applyFakeTemplater(tag, ownerTag, subject as TagSubject)
  }

  if(isSameTag) {
    existingTag.updateByTag(tag)
    return
  }

  if(isSameTag || isSameTag2) {
    const subjectTag = subject as TagSubject
    const global = existingTag.tagSupport.templater.global
    delete global.placeholderElm
    const insertBefore = global.insertBefore as InsertBefore

    return processTag(
      value as Tag,
      subjectTag,
      insertBefore,
      ownerTag,// existingTag, // tag,
    )
  }

  return processRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    (subject as DisplaySubject).insertBefore
  )
}
