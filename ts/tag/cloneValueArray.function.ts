import { Tag } from './Tag.class'
import { deepClone } from '../deepFunctions'
import { isTagArray, isTagClass, isTagComponent, isTagTemplater } from '../isInstance'
import { TemplaterResult } from '../TemplaterResult.class'

export function cloneValueArray<T>(values: (T | Tag | Tag[])[]): T[] {
  return values.map((value) => {
    const tag = value as Tag

    if(isTagComponent(value)) {
      const tagComponent = value as TemplaterResult
      return deepClone(tagComponent.props)
    }

    if(isTagClass(tag) || isTagTemplater(tag)) {
      return cloneValueArray(tag.values)
    }

    if(isTagArray(tag)) {
      return cloneValueArray(tag as unknown as Tag[])
    }

    return deepClone(value)
  })
}
