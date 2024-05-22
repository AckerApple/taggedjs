import { SubjectLike } from "./subject/subject.utils"
import { Tag } from "./tag/Tag.class"
import { TemplaterResult } from "./TemplaterResult.class"

export function isTagComponent(
  value?: TemplaterResult | unknown
) {
  return (value as TemplaterResult)?.wrapper?.parentWrap.original instanceof Function
}

export function isTag(
  value?: TemplaterResult | Tag | unknown
) {
  return isTagTemplater(value) || isTagClass(value)
}

export function isTagTemplater(
  value?: TemplaterResult | unknown
) {
  const templater = value as TemplaterResult
  return templater?.isTemplater === true && templater.wrapper === undefined
}

export function isTagClass(
  value?: Tag | unknown
) {
  const templater = value as Tag
  return templater?.isTagClass === true
}

// isSubjectLike
export function isSubjectInstance(
  subject?: SubjectLike<any> | any
): Boolean {
  return (subject?.isSubject === true || subject?.subscribe) ? true : false // subject?.isSubject === true || 
}

export function isTagArray(value: any) {
  return value instanceof Array && value.every(x => isTagClass(x) || isTagTemplater(x))
}
