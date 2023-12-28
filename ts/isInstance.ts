import { Subject } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { TemplaterResult } from "./tag.js"

export function isTagComponent(value?: TemplaterResult) {
  return value?.isTemplater === true
}

export function isTagInstance(tag?: Tag | unknown) {
  return (tag as Tag)?.isTag === true
}

export function isSubjectInstance(subject?: Subject) {
  return subject?.isSubject === true
}
