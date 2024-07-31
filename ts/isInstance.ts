import { SubjectLike } from './subject/subject.utils.js'
import { DomTag, StringTag } from './tag/Tag.class.js'
import { TemplaterResult } from './tag/TemplaterResult.class.js'
import { ImmutableTypes, ValueTypes } from './tag/ValueTypes.enum.js'

export function isSimpleType(value: any) {
  return [
    ImmutableTypes.string,
    ImmutableTypes.number,
    ImmutableTypes.boolean,
  ].includes(value)
}

export function isStaticTag(
  value?: TemplaterResult | StringTag | unknown
) {
  return [
    ValueTypes.dom,
    ValueTypes.tag,
    ValueTypes.templater,
  ].includes( (value as any)?.tagJsType )
}

export function isTagComponent(
  value?: TemplaterResult | unknown
) {
  const tagType = (value as TemplaterResult)?.tagJsType
  return tagType && [ValueTypes.tagComponent, ValueTypes.stateRender].includes(tagType)
}

// isSubjectLike
export function isSubjectInstance(
  subject?: SubjectLike<any> | any
): Boolean {
  // const isSubject = subject?.isSubject === true
  // return (isSubject || subject?.subscribe) ? true : false // subject?.isSubject === true || 
  return subject?.subscribe ? true : false // subject?.isSubject === true || 
}
