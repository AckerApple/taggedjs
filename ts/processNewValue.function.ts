import { Context, Tag } from "./Tag.class.js"
import { TagSubject, getSubjectFunction, setValueRedraw } from "./Tag.utils.js"
import { ValueSubject } from "./ValueSubject.js"
import { isSubjectInstance, isTagComponent, isTagInstance } from "./isInstance.js"

export function processNewValue(
  hasValue: boolean,
  value: any,
  context: Context,
  variableName: string,
  tag: Tag,
) {
  if(isTagComponent(value)) {
    const existing = context[variableName] = new ValueSubject(value) as TagSubject
    setValueRedraw(value, existing, tag)
    return
  }

  if(value instanceof Function) {
    context[variableName] = getSubjectFunction(value, tag)
    return
  }

  if(!hasValue) {
    return // more strings than values, stop here
  }

  if(isTagInstance(value)) {
    value.ownerTag = tag
    tag.children.push(value)
    context[variableName] = new ValueSubject(value)
    return
  }

  if(isSubjectInstance(value)) {
    context[variableName] = value
    return
  }

  context[variableName] = new ValueSubject(value)
}
