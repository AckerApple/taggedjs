import { SubjectLike } from './subject/subject.utils.js'
import { AnySupport } from './tag/AnySupport.type.js'
import { StringTag } from './tag/StringTag.type.js'
import { TemplaterResult } from './tag/getTemplaterResult.function.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './tag/ValueTypes.enum.js'

export function isSimpleType(value: any) {
  switch (value) {
    case ImmutableTypes.string:
    case ImmutableTypes.number:
    case ImmutableTypes.boolean:
      return true
  }

  return false
}

export function isStaticTag(
  value?: TemplaterResult | StringTag | unknown
) {
  if(!value) {
    return false
  }

  const tagJsType = (value as StringTag).tagJsType as ValueType
  switch (tagJsType) {
    case ValueTypes.dom:
    case ValueTypes.tag:
    case ValueTypes.templater:
      return true
  }

  return false
}

/** passed in is expected to be a TemplaterResult */
export function isTagComponent(
  value?: TemplaterResult | Exclude<unknown,AnySupport>
) {
  const tagType = (value as TemplaterResult)?.tagJsType
  return tagType === ValueTypes.tagComponent || tagType === ValueTypes.stateRender
}

// isSubjectLike
export function isSubjectInstance(
  subject?: SubjectLike<any> | any
): boolean {
  return isObject(subject) && typeof subject.subscribe === BasicTypes.function
}

export function isPromise(value: any) {
  return value && isFunction(value.then)
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
