import { SubjectLike } from "./Subject"
import { Tag } from "./Tag.class"
import { TemplaterResult } from "./TemplaterResult.class"

export function isTagComponent(value?: TemplaterResult | unknown) {
  return (value as TemplaterResult)?.isTemplater === true
}

export function isTagInstance(tag?: TemplaterResult | unknown) {
  return (tag as TemplaterResult)?.isTag === true
}

export function isSubjectInstance(
  subject?: SubjectLike | any
): Boolean {
  return (subject?.isSubject === true || subject?.subscribe) ? true : false // subject?.isSubject === true || 
}

export function isTagArray(value: any) {
  return value instanceof Array && value.every(x => isTagInstance(x))
}
