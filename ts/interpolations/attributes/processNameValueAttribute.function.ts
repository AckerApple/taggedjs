import { specialAttribute } from './specialAttribute.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { TagGlobal } from '../../tag/getTemplaterResult.function.js'
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js'
import { SpecialDefinition } from '../../render/attributes/Special.types.js'
import { BaseContextItem, ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/index.js'
import { BasicTypes } from '../../tag/ValueTypes.enum.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { blankHandler } from '../../render/dom/blankHandler.function.js'
import { Subject, valueToTagJsVar } from '../../index.js'

export function processDynamicNameValueAttribute(
  attrName: string,
  value: any | TagGlobal,
  contextItem: AttributeContextItem,
  element: Element,
  howToSet: HowToSet,
  support: AnySupport,
  isSpecial: SpecialDefinition,
  _contexts: ContextItem[],
) {
  contextItem.element = element as HTMLElement
  contextItem.howToSet = howToSet

  if(typeof(value) === BasicTypes.function ) {
    return processTagCallbackFun(
      contextItem,
      value,
      support,
      attrName,
      element,
    )
  }

  contextItem.attrName = attrName
  contextItem.isSpecial = isSpecial

  if( value?.tagJsType ) {
    processTagJsAttribute(attrName, value, contextItem, support, element)
    return
  }

  return processNonDynamicAttr(
    attrName,
    value,
    element,
    howToSet,
    isSpecial,
    contextItem,
  )
}

export function processTagJsAttribute(
  name: string,
  value: TagJsVar,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  element: Element,
) {
  value.processInitAttribute(
    name,
    value,
    element as HTMLElement,
    value,
    contextItem,
    ownerSupport,
  )

  contextItem.tagJsVar = value
}

export function processNonDynamicAttr(
  attrName: string,
  value: string,
  element: Element,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
  context: ContextItem,
) {
  if (isSpecial) {
    return specialAttribute(
      attrName,
      value,
      element,
      isSpecial,
    )
  }

  if( typeof value === 'function') {
    return processFunctionAttr(
      value,
      context,
      attrName,
      element as HTMLElement,
    )
  }

  howToSet(element as HTMLElement, attrName, value)
}
/** Used for bolts like div.style(() => {{backgroundColor:}}) */
function processFunctionAttr(
  value: never,
  parentContext: ContextItem, // parent context
  attrName: string,
  element: HTMLElement,
) {
  const innerValue = (value as any)()
  
  const tagJsVarOverride: TagJsVar = {
    tagJsType: 'dynamic-attr',
    checkValueChange: (
      _value: unknown,
      _contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      const newValue = (value as any)()
      return subContext.tagJsVar.checkValueChange(
        newValue,
        subContext,
        ownerSupport,
      )
    },
    processInit: blankHandler,
    processInitAttribute: blankHandler,
    destroy: (
      _contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      subContext.tagJsVar.destroy(subContext, ownerSupport)
    },
    processUpdate: (
      _value: any,
      _contextItem: ContextItem,
      ownerSupport: AnySupport,
      values: unknown[],
    ) => {
      const newValue = (value as any)()
      // const oldValue = subContext.value
      // const newTagJsVar = valueToTagJsVar(newValue)

      subContext.tagJsVar.processUpdate(
        newValue, // newTagJsVar as any,
        subContext,
        ownerSupport,
        values
      )
      
      subContext.value = newValue
    }
  }

  const subContext: BaseContextItem = {
    isAttr: true,
    element,
    parentContext,
    value: innerValue, // used for new value comparing
    tagJsVar: valueToTagJsVar(innerValue),

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }

  const contextItem: BaseContextItem = {
    isAttr: true,
    contexts: [subContext],
    element,
    parentContext,
    tagJsVar: tagJsVarOverride,

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }

  subContext.tagJsVar.processInitAttribute(
    attrName,
    innerValue,
    element,
    subContext.tagJsVar,
    subContext,
    {} as AnySupport
  )

  return contextItem
}

