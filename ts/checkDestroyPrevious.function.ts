import { DisplaySubject, TagSubject } from './Tag.utils'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagArraySubject } from './processTagArray'
import { isLikeTags } from './isLikeTags.function'
import { Counts } from './interpolateTemplate'
import { destroyTagMemory, destroyTagSupportPast } from './destroyTag.function'
import { InsertBefore } from './Clones.type'
import { insertAfter } from './insertAfter.function'

export function checkDestroyPrevious(
  subject: InterpolateSubject, // existing.value is the old value
  newValue: unknown,
  insertBefore: InsertBefore,
) {
  const arraySubject = subject as TagArraySubject
  const wasArray = arraySubject.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(newValue)) {
    const placeholderElm = arraySubject.placeholder as Text
    delete arraySubject.lastArray
    delete arraySubject.placeholder
    insertAfter(insertBefore, placeholderElm)

    wasArray.forEach(({tag}) => destroyArrayTag(tag, {added:0, removed:0}))

    return 'array'
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
        // put template back down
        restoreTagMarker(existingTag, insertBefore)
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
    restoreTagMarker(existingTag, insertBefore)

    // destroy old component, value is not a component
    destroyTagMemory(existingTag, tagSubject)
    return 'different-tag'
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
  
  delete subject.clone
  delete subject.lastValue
}

export function restoreTagMarker(
  existingTag: Tag,
  insertBefore: InsertBefore,
) {
  const global = existingTag.tagSupport.templater.global
  const placeholderElm = global.placeholder
  if(placeholderElm) {
    insertAfter(insertBefore, placeholderElm)
  }
}
