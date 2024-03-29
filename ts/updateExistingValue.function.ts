import { DisplaySubject, TagSubject, getSubjectFunction } from './Tag.utils'
import { TagSupport } from './TagSupport.class'
import { Subject } from './Subject'
import { TemplaterResult } from './TemplaterResult.class'
import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { InterpolateSubject, processTag } from './processSubjectValue.function'
import { TagArraySubject, processTagArray } from './processTagArray'
import { updateExistingTagComponent } from './updateExistingTagComponent.function'
import { RegularValue, processRegularValue } from './processRegularValue.function'
import { checkDestroyPrevious } from './checkDestroyPrevious.function'
import { ValueSubject } from './ValueSubject'
import { processSubjectComponent } from './processSubjectComponent.function'
import { isLikeTags } from './isLikeTags.function'
import { Callback, bindSubjectCallback } from './bindSubjectCallback.function'

export type ExistingValue = TemplaterResult | Tag[] | TagSupport | Function | Subject<unknown> | RegularValue | Tag

export function updateExistingValue(
  subject: InterpolateSubject,
  value: ExistingValue,
  ownerTag: Tag,
  insertBefore: Element | Text,
): InterpolateSubject {
  const subjectSubArray = subject as TagArraySubject
  const subjectSubTag = subject as TagSubject
  const isChildSubject = subjectSubArray.isChildSubject
  const isComponent = isTagComponent(value)

  // If we are working with tag component 2nd argument children, the value has to be digged
  if(isChildSubject) {
    value = (value as TagSubject).value // A subject contains the value
  }

  const oldInsertBefore = (subject as DisplaySubject).template || subjectSubTag.tag?.tagSupport.templater.global.insertBefore || (subjectSubTag as DisplaySubject).clone

  checkDestroyPrevious(subject, value)

  /*
  if(subjectSubTag.tag && !subjectSubTag.tag.hasLiveElements) {
    throw new Error('cannot update tag with no live elements')
  }
  */

  // handle already seen tag components
  if(isComponent) {
    const templater = value as TemplaterResult
    
    // When was something before component
    if(!subjectSubTag.tag) {
      processSubjectComponent(
        templater,
        subject as TagSubject,
        oldInsertBefore,
        ownerTag,
        {
          forceElement: true,
          counts: {added: 0, removed: 0},
        }
      )

      return subjectSubTag
    }

    if(!templater.global.oldest) {
      const oldTag = subjectSubTag.tag
      const oldWrap = oldTag.tagSupport.templater.wrapper // tag versus component

      if(oldWrap) {
        if(oldWrap.original === templater.wrapper?.original) {
          templater.global = {...oldTag.tagSupport.templater.global}
          console.log('🐷 disconnected global', {
            oldWrap: oldTag.tagSupport.templater.wrapper.original,
            tempWrap: templater.wrapper.original,
            global: templater.global,
          })
        }
      }
    }

    updateExistingTagComponent(
      ownerTag,
      templater, // latest value
      subjectSubTag,
      insertBefore,
    )

    return subjectSubTag
  }
  
  // was component but no longer
  const subjectTag = subjectSubTag.tag
  if(subjectTag) {
    handleStillTag(
      subjectTag,
      subject as TagSubject | TagArraySubject,
      value as Tag,
      ownerTag
    )

    return subjectSubTag
  }

  // its another tag array
  if(isTagArray(value)) {
    processTagArray(
      subject as TagArraySubject,
      value as any as Tag[],
      oldInsertBefore,
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
    subjectSubTag.template = oldInsertBefore
    processTag(
      value as Tag,
      subjectSubTag,
      subjectSubTag.template,
      ownerTag,// existingTag, // tag,
      {
        counts: {
          added: 0,
          removed: 0,
        }
      }
    )
    return subjectSubTag
  }

  // we have been given a subject
  if(isSubjectInstance(value)) {
    return value as ValueSubject<any>
  }

  // This will cause all other values to render
  processRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    oldInsertBefore,
  )

  return subjectSubTag
}

function handleStillTag(
  existingTag: Tag,
  subject: InterpolateSubject,
  value: Tag | TemplaterResult | RegularValue,
  ownerTag: Tag,
) {
  const oldWrapper = existingTag.tagSupport.templater.wrapper
  const newWrapper = (value as any)?.wrapper
  // const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original

  // TODO: We shouldn't need both of these
  const isSameTag = value && isLikeTags(existingTag, value as Tag)
  const isSameTag2 = value && (value as any).getTemplate && existingTag.isLikeTag(value as any)

  const tag = value as Tag

  if(!tag.tagSupport) {
    const fakeTemplater = {
      global: {
        context: {},
        oldest: tag,
      },
      children: new ValueSubject<Tag[]>([]),
    } as TemplaterResult
    tag.tagSupport = new TagSupport(ownerTag.tagSupport, fakeTemplater, subject as TagSubject)
  }

  if(isSameTag) {
    existingTag.updateByTag(tag)
    return
  }

  if(isSameTag || isSameTag2) {
    return processTag(
      value as Tag,
      subject as TagSubject,
      (subject as TagSubject).template,
      ownerTag,// existingTag, // tag,
      {
        counts: {
          added: 0,
          removed: 0,
        }
      }
    )
  }

  return processRegularValue(
    value as RegularValue,
    subject as DisplaySubject,
    (subject as DisplaySubject).template
  )
}
