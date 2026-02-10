// taggedjs-no-compile

import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { AnySupport, BasicTypes, SupportContextItem } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processDynamicNameValueAttribute } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { SpecialDefinition } from './Special.types.js'
import { getTagVarIndex } from './getTagVarIndex.function.js'
import { valueToTagJsVar } from '../../TagJsTags/valueToTagJsVar.function.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { Subject } from '../../subject/Subject.class.js'
import { processTagCallbackFun } from './processAttribute.function.js'

/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export function createDynamicArrayAttribute(
  attrName: string,
  array: any[],
  element: HTMLElement,
  contexts: ContextItem[],
  howToSet: HowToSet, //  = howToSetInputValue
  values: unknown[],
  parentContext: ContextItem,
): ContextItem[] {
  const startIndex = contexts.length
  const createdContexts: ContextItem[] = []

  // loop all to attach context and processors
  array.forEach((value) => {
    const valueVar = getTagVarIndex(value)
    if(valueVar >= 0) {
      const myIndex = contexts.length
      const tagJsVar = valueToTagJsVar(value)
      const contextItem: AttributeContextItem = {
        updateCount: 0,
        isAttr: true,
        target: element,
        attrName: attrName as string,
        withinOwnerElement: true,
        tagJsVar,
        valueIndex: (parentContext as SupportContextItem).varCounter, // contexts.length,
        parentContext,
        destroy$: new Subject(),
        render$: new Subject(),
        // paintCommands: [],
      }
  
      // contextItem.handler =
      tagJsVar.processUpdate = function arrayItemHandler(
        value, contextItem, newSupport, newValues
      ) {
        ++contextItem.updateCount
        setBy(newValues)
      }

      const pushValue = values[myIndex]
      contextItem.value = pushValue
      createdContexts.push(contextItem)
      ++(parentContext as SupportContextItem).varCounter
    }
  })

  function setBy(values: unknown[]) {
    const concatValue = buildNewValueFromArray(array, values, startIndex).join('')
    howToSet(element, attrName, concatValue)
  }

  setBy(values)

  return createdContexts
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
) {
  if(typeof(value) === BasicTypes.function ) {
    ++(parentContext as SupportContextItem).varCounter
    return processTagCallbackFun(
      // contextItem,
      value,
      support,
      attrName,
      element,
    )
  }

  const tagJsVar = valueToTagJsVar(value)
  const contextItem: AttributeContextItem = {
    updateCount: 0,
    isAttr: true,
    target: element,
    attrName,
    howToSet,
    value,
    withinOwnerElement: true,
    tagJsVar,
    destroy$: new Subject(),
    render$: new Subject(),
    // paintCommands: [],
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
  )

  contextItem.value = value

  return contextItem
}
