import { Tag } from './Tag.class'
import { TagSubject } from './Tag.utils'
import { ValueSubject } from './subject/ValueSubject'
import { isSubjectInstance, isTagComponent, isTagInstance } from './isInstance'

export function processNewValue(
  hasValue: boolean,
  value: any,
  ownerTag: Tag,
) {
  if(isTagComponent(value)) {
    const tagSubject = new ValueSubject(value) as TagSubject
    return tagSubject
  }

  if(value instanceof Function) {
    // return getSubjectFunction(value, ownerTag)
    return new ValueSubject(value)
  }

  if(!hasValue) {
    return // more strings than values, stop here
  }

  if(isTagInstance(value)) {
    value.ownerTag = ownerTag
    
    if(ownerTag.childTags.find(x => x === value)) {
      throw new Error('about to reattach tag already present - 2')
    }

    return new ValueSubject(value)
  }

  if(isSubjectInstance(value)) {
    return value // its already a value subject
  }

  return new ValueSubject(value)
}
