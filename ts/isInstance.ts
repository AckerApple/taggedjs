import { SubjectLike } from './subject/subject.utils.js'
import { Dom, Tag } from './tag/Tag.class.js'
import { TemplaterResult } from './tag/TemplaterResult.class.js'
import { ValueTypes } from './tag/ValueTypes.enum.js'

export function isStaticTag(
  value?: TemplaterResult | Tag | unknown
) {
  return [
    ValueTypes.dom,
    ValueTypes.tag,
    ValueTypes.templater,
  ].includes( (value as any)?.tagJsType )
}

export function isTagTemplater(
  value?: TemplaterResult | unknown
) {
  return (value as TemplaterResult)?.tagJsType === ValueTypes.templater
}

// TODO: whats the difference between isTagClass and isTagComponent
export function isTagComponent(
  value?: TemplaterResult | unknown
) {
  return (value as TemplaterResult)?.tagJsType === ValueTypes.tagComponent
}

export function isTagClass(
  value?: Tag | Dom | unknown
) {
  const tagJsType = (value as Tag|Dom)?.tagJsType
  return tagJsType && [ValueTypes.tag, ValueTypes.dom].includes(tagJsType)
}

// isSubjectLike
export function isSubjectInstance(
  subject?: SubjectLike<any> | any
): Boolean {
  const isSubject = subject?.isSubject === true
  return (isSubject || subject?.subscribe) ? true : false // subject?.isSubject === true || 
}

export function isTagArray(value: unknown) {
  return value instanceof Array && value.every(x => [
    ValueTypes.tag,
    ValueTypes.templater,
    ValueTypes.dom,
    ValueTypes.tagComponent
  ].includes( x?.tagJsType ))
}
