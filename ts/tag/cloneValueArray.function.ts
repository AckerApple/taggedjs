import { StringTag } from './Tag.class.js'
import { deepClone } from '../deepFunctions.js'
import { ValueType, ValueTypes } from './ValueTypes.enum.js'
import { isArray } from '../isInstance.js'

export function cloneValueArray<T>(
  values: (T | StringTag | StringTag[])[]
): T[] {
  return values.map(cloneTagJsValue as any)
}

/** clones only what is needed to compare differences later */
export function cloneTagJsValue<T>(
  value: T,
  maxDepth: number,
): T {
  const tag = value as StringTag

  const tagJsType = (value as any)?.tagJsType as ValueType
  if(tagJsType) {
    switch( tagJsType ) {
      case ValueTypes.stateRender:
        return undefined as any

      case ValueTypes.dom:
      case ValueTypes.tag:
      case ValueTypes.templater:
        return cloneValueArray(tag.values) as T
    }
  }

  if(isArray(value)) {
    return cloneValueArray(tag as unknown as StringTag[]) as T
  }

  return deepClone(value, maxDepth)
}
