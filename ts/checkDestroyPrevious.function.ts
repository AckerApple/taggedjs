import { DisplaySubject, TagSubject } from "./Tag.utils.js"
import { isTagArray, isTagComponent, isTagInstance } from "./isInstance.js"
import { Tag } from "./Tag.class.js"
import { destroySimpleValue } from "./processSubjectValue.function.js"
import { TagArraySubject } from "./processTagArray.js"
import { ExistingSubject } from "./updateExistingValue.function.js"
import { isLikeTags } from "./isLikeTags.function.js"

export function checkDestroyPrevious(
  existing: ExistingSubject, // existing.value is the old value
  newValue: unknown,
) {
  const existingSubArray = existing as TagArraySubject
  const wasArray = existingSubArray.lastArray
  
  // no longer an array
  if (wasArray && !isTagArray(newValue)) {
    wasArray.forEach(({tag}) => tag.destroy())
    delete (existing as any).lastArray  
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
  existingTag: Tag,
  existingSubject: TagSubject,
) {
  delete (existingSubject as any).tag
  delete (existingSubject as any).tagSupport
  existingTag.destroy()
}
