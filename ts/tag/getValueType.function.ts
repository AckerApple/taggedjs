import { isSimpleType } from './checkDestroyPrevious.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { isSubjectInstance, isTagArray } from '../isInstance.js'

export function getValueType(value: any): ValueTypes {
  if(value === undefined || value === null) {
    return ValueTypes.undefined
  }

  const type = typeof(value)
  
  if(value instanceof Function) {
    return ValueTypes.function
  }

  if(isSimpleType(type)) {
    return type as ValueTypes
  }

  if(type === ValueTypes.object) {
    if(value instanceof Date) {
      return ValueTypes.date
    }

    const tagJsType = value.tagJsType
    if(tagJsType) {
      return tagJsType
      /*
      const included = [
        ValueTypes.tagComponent,
        ValueTypes.templater,
        ValueTypes.tag,
        ValueTypes.dom,
      ].includes(tagJsType)
  
      if(included) {
        return tagJsType
      }
      */
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
