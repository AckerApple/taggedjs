import { DisplaySubject, TagSubject } from './Tag.utils'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagArraySubject } from './processTagArray'
import { isLikeTags } from './isLikeTags.function'
import { Counts, Template } from './interpolateTemplate'
import { TagSupport } from './TagSupport.class'

export function checkDestroyPrevious(
  existing: InterpolateSubject, // existing.value is the old value
  newValue: unknown,
) {
  const existingSubArray = existing as TagArraySubject
  const wasArray = existingSubArray.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(newValue)) {
    wasArray.forEach(({tag}) => destroyArrayTag(tag, {added:0, removed:0}))
    delete (existing as TagArraySubject).lastArray  
    return 1
  }

  const tagSubject = existing as TagSubject
  const existingTag = tagSubject.tag
  
  // no longer tag or component?
  if(existingTag) {
    const isValueTag = isTagInstance(newValue)
    const isSubjectTag = isTagInstance(existing.value)

    if(isSubjectTag && isValueTag) {
      const newTag = newValue as Tag
      if(!isLikeTags(newTag, existingTag)) {
        destroyTagMemory(existingTag, tagSubject)
        return 2
      }

      return false
    }

    const isValueTagComponent = isTagComponent(newValue)
    if(isValueTagComponent) {
      return false // its still a tag component
    }

    // destroy old component, value is not a component
    destroyTagMemory(existingTag, tagSubject)
    return 3
  }

  const displaySubject = existing as DisplaySubject
  const hasLastValue = 'lastValue' in displaySubject
  const lastValue = displaySubject.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
  // was simple value but now something bigger
  if(hasLastValue && lastValue !== newValue) {
    destroySimpleValue(displaySubject.template, displaySubject)
    return 4
  }

  return false
}

export function destroyTagMemory(
  tag: Tag,
  existingSubject: TagSubject,
) {
  const oldTagSupport = tag.tagSupport
  destroyTagSupportPast(oldTagSupport)
  delete (existingSubject as any).tag
  tag.destroy()
}

export function destroyTagSupportPast(oldTagSupport: TagSupport) {
  delete oldTagSupport.templater.global.oldest
  delete oldTagSupport.templater.global.newest
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
  template: Element | Text | Template,
  subject: DisplaySubject,
) {
  const clone = subject.clone as Element
  const parent = clone.parentNode as ParentNode

  // put the template back down
  parent.insertBefore(template, clone)
  parent.removeChild(clone)
  
  delete subject.clone
  delete subject.lastValue
  // subject.template = template
}
