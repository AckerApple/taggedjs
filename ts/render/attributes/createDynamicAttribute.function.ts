// taggedjs-no-compile

import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { AnySupport } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processDynamicNameValueAttribute } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { SpecialDefinition } from './Special.types.js'
import { getTagVarIndex } from './getTagVarIndex.function.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { Subject } from '../../subject/Subject.class.js'

/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export function createDynamicArrayAttribute(
  attrName: string,
  array: any[],
  element: HTMLElement,
  contexts: ContextItem[],
  howToSet: HowToSet, //  = howToSetInputValue
  values: unknown[],
  parentContext: ContextItem,
) {
  const startIndex = contexts.length

  // loop all to attach context and processors
  array.forEach((value) => {
    const valueVar = getTagVarIndex(value)
    if(valueVar >= 0) {
      const myIndex = contexts.length
      const tagJsVar = valueToTagJsVar(value)
      const contextItem: AttributeContextItem = {
        isAttr: true,
        element,
        attrName: attrName as string,
        withinOwnerElement: true,
        tagJsVar,
        valueIndex: contexts.length,
        parentContext,
        destroy$: new Subject(),
      }
  
      // contextItem.handler =
      tagJsVar.processUpdate = function arrayItemHandler(
        value, newSupport, contextItem, newValues
      ) {
        setBy(newValues)
      }

      const pushValue = values[myIndex]
      contextItem.value = pushValue

      contexts.push(contextItem)
    }
  })

  function setBy(values: unknown[]) {
    const concatValue = buildNewValueFromArray(array, values, startIndex).join('')
    howToSet(element, attrName, concatValue)
  }

  setBy(values)

  return contexts
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
  element: HTMLElement,
  context: ContextItem[],
  parentContext: ContextItem,
  howToSet: HowToSet, //  = howToSetInputValue
  support: AnySupport,
  isSpecial: SpecialDefinition,
  varIndex: number,
  contexts: ContextItem[],
) {
  const tagJsVar = valueToTagJsVar(value)
  const contextItem: AttributeContextItem = {
    isAttr: true,
    element,
    attrName,
    withinOwnerElement: true,
    tagJsVar,
    destroy$: new Subject(),
    valueIndex: varIndex,
    parentContext,
  }

  context.push(contextItem)
  tagJsVar.processUpdate = processUpdateAttrContext

  processDynamicNameValueAttribute(
    attrName as string,
    value,
    contextItem,
    element,
    howToSet,
    support,
    isSpecial,
    contexts,
  )

  contextItem.value = value

  return contextItem
}
