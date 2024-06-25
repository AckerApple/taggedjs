import { BasicTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { isSimpleType, isSubjectInstance, isTagArray } from '../isInstance.js'

export function getValueType(value: any): BasicTypes | ValueType {
  if(value === undefined || value === null) {
    return ValueTypes.undefined
  }

  const tagJsType = value.tagJsType
  if(tagJsType) {
    return tagJsType // oneRender, stateRender
  }

  if(value instanceof Function) {
    return ValueTypes.function
  }

  const type = typeof(value)
  if(isSimpleType(type)) {
    return type as BasicTypes
  }

  if(type === BasicTypes.object) {
    if(value instanceof Date) {
      return ValueTypes.date
    }

    if (isTagArray(value)) {
      return ValueTypes.tagArray
    }
  
    if(isSubjectInstance(value)) {
      return ValueTypes.subject
    }
  }

  return ValueTypes.unknown
}
