import { SubjectLike } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { TemplaterResult } from "./templater.utils.js"

export function isTagComponent(value?: TemplaterResult) {
  return value?.isTemplater === true
}

export function isTagInstance(tag?: Tag | unknown) {
  return (tag as Tag)?.isTag === true
}

export function isSubjectInstance(
  subject?: SubjectLike
): Boolean {
  return (subject?.isSubject === true || subject?.subscribe) ? true : false // subject?.isSubject === true || 
}
