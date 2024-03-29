import { DisplaySubject, TagSubject } from './Tag.utils'
import { isTagArray, isTagComponent, isTagInstance } from './isInstance'
import { Tag } from './Tag.class'
import { InterpolateSubject } from './processSubjectValue.function'
import { TagArraySubject } from './processTagArray'
import { isLikeTags } from './isLikeTags.function'
import { Counts, Template } from './interpolateTemplate'
import { destroyTagMemory, destroyTagSupportPast } from './destroyTag.function'
import { TemplaterResult } from './TemplaterResult.class'

export function checkDestroyPrevious(
  subject: InterpolateSubject, // existing.value is the old value
  newValue: unknown,
) {
  const existingSubArray = subject as TagArraySubject
  const wasArray = existingSubArray.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(newValue)) {
    // if(isTagInstance(newValue) || isTagComponent(newValue)) {
    //   const templater = newValue as TemplaterResult
    //   delete templater.global.oldest
    //   delete templater.global.newest
    //   templater.global.context = {}
    // }
    wasArray.forEach(({tag}) => destroyArrayTag(tag, {added:0, removed:0}))
    delete (subject as TagArraySubject).lastArray  
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

  const displaySubject = subject as DisplaySubject
  const hasLastValue = 'lastValue' in displaySubject
  const lastValue = displaySubject.lastValue // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
  // was simple value but now something bigger
  if(hasLastValue && lastValue !== newValue) {
    destroySimpleValue(displaySubject.template, displaySubject)
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
