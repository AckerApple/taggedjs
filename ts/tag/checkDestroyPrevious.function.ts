import { DisplaySubject, TagSubject } from '../subject.types'
import { isTag, isTagArray, isTagComponent } from '../isInstance'
import { InterpolateSubject } from './update/processFirstSubject.utils'
import { TagArraySubject } from './update/processTagArray'
import { isLikeTags } from './isLikeTags.function'
import { Counts } from '../interpolations/interpolateTemplate'
import { destroyTagMemory, destroyTagSupportPast } from './destroyTag.function'
import { InsertBefore } from '../interpolations/Clones.type'
import { insertAfter } from '../insertAfter.function'
import { TagSupport } from './TagSupport.class'

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

    wasArray.forEach(({tagSupport}) => destroyArrayTag(tagSupport, {added:0, removed:0}))

    return 'array'
  }

  const tagSubject = subject as TagSubject
  const lastSupport = tagSubject.tagSupport
  
  // no longer tag or component?
  if(lastSupport) {
    const isValueTag = isTag(newValue)
    const isSubjectTag = isTag(subject.value)

    if(isSubjectTag && isValueTag) {
      const newTag = newValue as TagSupport
      
      // its a different tag now
      if(!isLikeTags(newTag, lastSupport)) {
        // put template back down
        restoreTagMarker(lastSupport)
        destroyTagMemory(lastSupport)
        return 2
      }

      return false
    }

    const isValueTagComponent = isTagComponent(newValue)
    if(isValueTagComponent) {
      return false // its still a tag component
    }

    // put template back down
    restoreTagMarker(lastSupport)

    // destroy old component, value is not a component
    destroyTagMemory(lastSupport)
    return 'different-tag'
  }

  const displaySubject = subject as DisplaySubject
  const hasLastValue = 'lastValue' in displaySubject
  const lastValue = displaySubject.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
  // was simple value but now something bigger
  if(hasLastValue && lastValue !== newValue) {
    const newType = typeof(newValue)
    if( isSimpleType(newType) && typeof(lastValue) === newType ) {
      return false
    }
    destroySimpleValue(insertBefore, displaySubject)
    return 'changed-simple-value'
  }

  return false
}

export function isSimpleType(value: any) {
  return ['string','number','boolean'].includes(value)
}

export function destroyArrayTag(
  tagSupport: TagSupport,
  counts: Counts,
) {
  destroyTagSupportPast(tagSupport)

  tagSupport.destroy({
    stagger: counts.removed++,
  })

  const insertBefore = tagSupport.global.insertBefore as Element
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.removeChild(insertBefore)
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
  lastSupport: TagSupport,
) {
  const insertBefore = lastSupport.global.insertBefore as Element
  const global = lastSupport.global
  const placeholderElm = global.placeholder
  if(placeholderElm) {
    insertAfter(insertBefore, placeholderElm)
    delete global.placeholder
  }
}