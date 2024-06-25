import { StringTag } from './Tag.class.js'
import { deepClone } from '../deepFunctions.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { getValueType } from './getValueType.function.js'
import { Props } from '../Props.js'

export function cloneValueArray<T>(
  values: (T | StringTag | StringTag[])[]
): T[] {
  return values.map(cloneTagJsValue as any)
}

/** clones only what is needed to compare differences later */
export function cloneTagJsValue<T>(
  value: T
): T {
  const tag = value as StringTag

  switch( getValueType(value) ) {
    case ValueTypes.stateRender:
      return undefined as any
      
    case ValueTypes.tagComponent:
      const tagComponent = value as TemplaterResult
      return deepClone(tagComponent.props) as any
    
    case ValueTypes.dom:
    case ValueTypes.tag:
    case ValueTypes.templater:
      return cloneValueArray(tag.values) as T

    case ValueTypes.tagArray:
      return cloneValueArray(tag as unknown as StringTag[]) as T
  }

  return deepClone(value)
}