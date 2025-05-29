// taggedjs-no-compile

import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processDynamicNameValueAttribute } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { SpecialDefinition } from './Special.types.js'
import { getTagVarIndex } from './getTagVarIndex.function.js'

/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export function createDynamicArrayAttribute(
  attrName: string,
  array: any[],
  element: Element,
  context: ContextItem[],
  howToSet: HowToSet, //  = howToSetInputValue
  support: AnySupport,
  counts: TagCounts,
  values: unknown[],
) {
  const startIndex = context.length

  // loop all to attach context and processors
  array.forEach((value) => {
    const valueVar = getTagVarIndex(value)
    if(valueVar >= 0) {
      const myIndex = context.length
      const contextItem: ContextItem = {
        isAttr: true,
        element,
        attrName: attrName as string,
        withinOwnerElement: true,
      }
  
      contextItem.handler = (value, newSupport, contextItem, newValues) => {
        setBy(newValues)
      }

      const pushValue = values[myIndex]
      contextItem.value = pushValue
      context.push(contextItem)
    }
  })

  function setBy(values: unknown[]) {
    const concatValue = buildNewValueFromArray(array, values, startIndex).join('')
    howToSet(element, attrName, concatValue)
  }

  setBy(values)
}

function buildNewValueFromArray(
  array: any[],
  values: unknown[],
  startIndex: number,
) {
  return array.reduce((all, value) => {
    const valueVar = getTagVarIndex(value)
    if(valueVar >= 0) {
      const myIndex = startIndex++
      const pushValue = values[myIndex]      
      all.push( pushValue )
      
      return all
    }
    
    all.push(value)
    
    return all
  }, [] as string[])
}

export function createDynamicAttribute(
  attrName: string,
  value: any,
  element: Element,
  context: ContextItem[],
  howToSet: HowToSet, //  = howToSetInputValue
  support: AnySupport,
  counts: TagCounts,
  isSpecial: SpecialDefinition,
) {
  const contextItem: ContextItem = {
    isAttr: true,
    element,
    attrName,
    withinOwnerElement: true,
  }

  context.push(contextItem)
  contextItem.handler = processUpdateAttrContext

  processDynamicNameValueAttribute(
    attrName as string,
    value,
    contextItem,
    element,
    howToSet,
    support,
    counts,
    isSpecial,
  )

  contextItem.value = value
}
