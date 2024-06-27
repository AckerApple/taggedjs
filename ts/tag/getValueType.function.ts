import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { isSimpleType, isSubjectInstance, isTagArray } from '../isInstance.js'

export function getValueType(
  value: any
): ImmutableTypes | BasicTypes | ValueType {
  if(value === undefined || value === null) {
    return ImmutableTypes.undefined
  }

  const tagJsType = value.tagJsType
  if(tagJsType) {
    return tagJsType // oneRender, stateRender
  }

  if(value instanceof Function) {
    return BasicTypes.function
  }

  const type = typeof(value)
  if(isSimpleType(type)) {
    return type as BasicTypes
  }

  if(type === BasicTypes.object) {
    if(value instanceof Date) {
      return BasicTypes.date
    }

    if (isTagArray(value)) {
      return ValueTypes.tagArray
    }
  
    if(isSubjectInstance(value)) {
      return ValueTypes.subject
    }
  }

  return BasicTypes.unknown
}
