import { SubjectLike } from './subject/subject.utils.js'
import { DomTag, StringTag } from './tag/Tag.class.js'
import { TemplaterResult } from './tag/TemplaterResult.class.js'
import { BasicTypes, ImmutableTypes, ValueTypes } from './tag/ValueTypes.enum.js'

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
  return isObject(subject) && typeof subject.subscribe === BasicTypes.function
}

export function isPromise(value: any) {
  return !!value && isFunction(value.then)
}

export function isFunction(value: any) {
  return typeof value === BasicTypes.function
}

export function isObject(value: any) {
  return typeof(value) === BasicTypes.object && value !== null
}

export function isArray(value: any) {
  return Array.isArray(value)
}
