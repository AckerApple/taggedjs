import { DisplaySubject, TagSubject } from './Tag.utils'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag, insertAfter } from './Tag.class'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagArraySubject } from './processTagArray'
import { isLikeTags } from './isLikeTags.function'
import { Counts } from './interpolateTemplate'
import { destroyTagMemory, destroyTagSupportPast } from './destroyTag.function'
import { InsertBefore, isRemoveTemplates } from './Clones.type'

export function checkDestroyPrevious(
  subject: InterpolateSubject, // existing.value is the old value
  newValue: unknown,
  insertBefore: InsertBefore,
) {
  const existingSubArray = subject as TagArraySubject
  const wasArray = existingSubArray.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(newValue)) {
    wasArray.forEach(({tag}) => destroyArrayTag(tag, {added:0, removed:0}))
    delete existingSubArray.lastArray  
    return 1
  }

  const tagSubject = subject as TagSubject
  const existingTag = tagSubject.tag
  
  // no longer tag or component?
  if(existingTag) {
    const isValueTag = isTagInstance(newValue)
    const isSubjectTag = isTagInstance(subject.value)

    if(isSubjectTag && isValueTag) {
      const newTag = newValue as Tag
      
      // its a different tag now
      if(!isLikeTags(newTag, existingTag)) {
        console.log('!!! not same tags destroy 2')
        // put template back down
        if(isRemoveTemplates) {
          restoreTagMarker(existingTag, insertBefore)
        }
        destroyTagMemory(existingTag, tagSubject)
        return 2
      }

      return false
    }

    const isValueTagComponent = isTagComponent(newValue)
    if(isValueTagComponent) {
      return false // its still a tag component
    }

    // put template back down
    if(isRemoveTemplates) {
      restoreTagMarker(existingTag, insertBefore)
    }

    console.log('!!! not same tags destroy 3')
    // destroy old component, value is not a component
    destroyTagMemory(existingTag, tagSubject)
    return 3
  }

  const displaySubject = subject as DisplaySubject
  const hasLastValue = 'lastValue' in displaySubject
  const lastValue = displaySubject.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
  // was simple value but now something bigger
  if(hasLastValue && lastValue !== newValue) {
    destroySimpleValue(insertBefore, displaySubject)
    return 4
  }

  return false
}

export function destroyArrayTag(
  tag: Tag,
  counts: Counts,
) {
  destroyTagSupportPast(tag.tagSupport)

  tag.destroy({
    stagger: counts.removed++,
  })
}

function destroySimpleValue(
  insertBefore: InsertBefore, // always a template tag
  subject: DisplaySubject,
) {
  const clone = subject.clone as Element
  const parent = clone.parentNode as ParentNode

  // 1 put the template back down
  parent.insertBefore(insertBefore, clone)
  parent.removeChild(clone)

  /*
  console.log('put back down', {
    insertBefore,
    clone,
    iParent: insertBefore.parentNode,
    cParent: clone.parentNode,
  })
  */
  
  delete subject.clone
  delete subject.lastValue
}

export function restoreTagMarker(
  existingTag: Tag,
  insertBefore: InsertBefore,
) {
  const global = existingTag.tagSupport.templater.global
  const placeholderElm = global.placeholderElm
  if(placeholderElm) {
    insertAfter(insertBefore, placeholderElm)
    // delete global.placeholderElm
  }
}
