import { Tag } from './Tag.class'
import { deepClone } from '../deepFunctions'
import { TemplaterResult } from '../TemplaterResult.class'
import { ValueTypes, getValueType } from './update/processFirstSubject.utils'

export function cloneValueArray<T>(values: (T | Tag | Tag[])[]): T[] {
  return values.map((value) => {
    const tag = value as Tag

    switch(getValueType(value)) {
      case ValueTypes.tagComponent:
        const tagComponent = value as TemplaterResult
        return deepClone(tagComponent.props)
      
      case ValueTypes.tag:
      case ValueTypes.templater:
        return cloneValueArray(tag.values)

      case ValueTypes.tagArray:
        return cloneValueArray(tag as unknown as Tag[])
    }

    return deepClone(value)
  })
}
