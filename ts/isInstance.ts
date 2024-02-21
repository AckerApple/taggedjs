import { SubjectLike } from "./Subject.js"
import { Tag } from "./Tag.class.js"
import { TemplaterResult } from "./templater.utils.js"

export function isTagComponent(value?: TemplaterResult | unknown) {
  return (value as TemplaterResult)?.isTemplater === true
}

export function isTagInstance(tag?: Tag | unknown) {
  return (tag as Tag)?.isTag === true
}

export function isSubjectInstance(
  subject?: SubjectLike | any
): Boolean {
  return (subject?.isSubject === true || subject?.subscribe) ? true : false // subject?.isSubject === true || 
}

export function isTagArray(value: any) {
  return value instanceof Array && value.every(x => isTagInstance(x))
}
