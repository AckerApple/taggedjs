import { SubjectLike } from './subject/subject.utils.js'
import { Support } from './tag/Support.class.js'
import { StringTag } from './tag/Tag.class.js'
import { TemplaterResult } from './tag/TemplaterResult.class.js'
import { BasicTypes, ImmutableTypes, ValueTypes } from './tag/ValueTypes.enum.js'

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
  switch ((value as any)?.tagJsType) {
    case ValueTypes.dom:
    case ValueTypes.tag:
    case ValueTypes.templater:
      return true
  }

  return false
}

/** passed in is expected to be a TemplaterResult */
export function isTagComponent(
  value?: TemplaterResult | Exclude<unknown, Support>
) {
  const tagType = (value as TemplaterResult)?.tagJsType
  return tagType === ValueTypes.tagComponent || tagType === ValueTypes.stateRender
}

// isSubjectLike
export function isSubjectInstance(
  subject?: SubjectLike<any> | any
): Boolean {
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
