// taggedjs-no-compile

import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js'
import { isFunction } from '../../isInstance.js'
import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/index.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { addOneContext } from '../addOneContext.function.js'
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js'
import { getTagJsVar, TagVarIdNum } from './getTagJsVar.function.js'
import { NoDisplayValue } from './NoDisplayValue.type.js'
import { SpecialDefinition } from './Special.types.js'
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { TemplateValue } from '../../index.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { processStandAloneAttribute } from './processStandAloneAttribute.function.js'

/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(
  values: unknown[], // all the variables inside html``
  attrName: string | TagVarIdNum,
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet, //  = howToSetInputValue
  contexts: ContextItem[],
  parentContext: ContextItem,
  isSpecial: SpecialDefinition,
  value: string | null | undefined | TagVarIdNum,
) {
  const varIndex = getTagJsVar(attrName)
  const isNameVar = varIndex >= 0
  const valueInValues = values[ varIndex ] as TemplateValue
  
  const tagJsVar = valueInValues as TagJsVar | undefined
  if( tagJsVar?.tagJsType ) {
    return processTagJsVarAttribute(
      value,
      contexts,
      parentContext,
      tagJsVar,
      varIndex,
      support,
      attrName,
      element,
      isNameVar,
    )
  }

  if( isNameVar ) {    
    const contextItem = addOneContext(
      valueInValues,
      contexts,
      true,
      parentContext,
    ) as any as AttributeContextItem

    contextItem.valueIndex = varIndex
    contextItem.isAttr = true
    contextItem.element = element
    contextItem.isNameOnly = true
    contextItem.howToSet = howToSet

    const tagJsVar = contextItem.tagJsVar
    tagJsVar.processUpdate = processUpdateAttrContext

    // single/stand alone attributes
    processStandAloneAttribute(
      values,
      valueInValues as any,
      element,
      support,
      howToSet as HowToSet,
      contexts,
      parentContext,
    )

    return contextItem
  }

  if(Array.isArray(value)) {
    return createDynamicArrayAttribute(
      attrName as string,
      value,
      element,
      contexts,
      howToSet,
      values,
      support.context,
    )
  }

  const valueVar = getTagJsVar(value)
  if(valueVar >= 0) {
    const value = values[valueVar]
    return createDynamicAttribute(
      attrName as string,
      value,
      element,
      contexts,
      parentContext,
      howToSet,
      support,
      isSpecial,
      valueVar,
    )
  }

  // simple name/value attribute
  processNonDynamicAttr(
    attrName as string,
    value as string,
    element,
    howToSet,
    isSpecial,
  )
}

function processTagJsVarAttribute(
  value: string | TagVarIdNum | null | undefined,
  contexts: ContextItem[],
  parentContext: ContextItem,
  tagJsVar: TagJsVar,
  varIndex: number,
  support: AnySupport,
  attrName: string | TagVarIdNum,
  element: HTMLElement,
  isNameVar: boolean,
) {
  const contextItem = addOneContext(
    value,
    contexts,
    true,
    parentContext,
  ) as any as AttributeContextItem

  contextItem.element = element
  contextItem.valueIndex = varIndex

  contextItem.isAttr = true
  contextItem.isNameOnly = isNameVar

  contextItem.stateOwner = getSupportWithState(support)
  contextItem.supportOwner = support

  // const parentContexts = parentContext.contexts as ContextItem[]
  // parentContexts.push(contextItem)

  setContextInCycle(contextItem)

  tagJsVar.processInitAttribute(
    attrName as string,
    tagJsVar,
    element,
    tagJsVar,
    contextItem,
    support,
  )

  removeContextInCycle()

  contextItem.oldTagJsVar = contextItem.tagJsVar
  contextItem.tagJsVar = tagJsVar

  return contextItem
}

/** Only used during updates */
export function processAttributeEmit(
  newAttrValue: any,
  attrName: string,
  subject: AttributeContextItem,
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
) {
  // should the function be wrapped so every time its called we re-render?
  if(isFunction(newAttrValue)) {
    return callbackFun(
      support,
      newAttrValue,
      element,
      attrName,
      isSpecial,
      howToSet,
      subject,
    )
  }
  
  return processAttributeSubjectValue(
    newAttrValue,
    element,
    attrName,
    isSpecial,
    howToSet,
    support,
  )
}

type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

/** figure out what type of attribute we are dealing with and/or feed value into handler to figure how to update */
export function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  element: HTMLElement,
  attrName: string,
  special: SpecialDefinition,
  howToSet: HowToSet,
  support: AnySupport,
) {
  // process adding/removing style. class. (false means remove)
  if ( special !== false ) {
    specialAttribute(
      attrName,
      newAttrValue,
      element,
      special, // string name of special
    )
    return
  }

  switch (newAttrValue) {
    case undefined:
    case false:
    case null:
      paintContent.push([paintContentPush, [element, attrName]])
      return
  }

  if( isFunction(newAttrValue) ) {
    return processAttributeFunction(element, newAttrValue as Callback, support, attrName)
  }

  // value is 0
  howToSet(element, attrName, newAttrValue as string)
}

function callbackFun(
  support: AnySupport,
  newAttrValue: any,
  element: HTMLElement,
  attrName: string,
  isSpecial: SpecialDefinition,
  howToSet: HowToSet,
  subject: AttributeContextItem,
) {
  const wrapper = support.templater.wrapper
  const tagJsType = wrapper?.tagJsType || (wrapper?.original as any)?.tagJsType
  const oneRender = tagJsType === ValueTypes.renderOnce
  
  if(!oneRender) {
    return processTagCallbackFun(
      subject,
      newAttrValue,
      support,
      attrName,
      element,
    )
  }

  return processAttributeSubjectValue(
    newAttrValue,
    element,
    attrName,
    isSpecial,
    howToSet,
    support,
  )
}

export function processTagCallbackFun(
  subject: AttributeContextItem,
  newAttrValue: any,
  support: AnySupport,
  attrName: string,
  element: Element,
) {
  // tag has state and will need all functions wrapped to cause re-renders
  newAttrValue = bindSubjectCallback(newAttrValue, support)

  const tagJsVar = subject.tagJsVar // = valueToTagJsVar(newAttrValue)
  tagJsVar.processUpdate = processUpdateAttrContext

  return processAttributeFunction(element, newAttrValue, support, attrName)
}

function paintContentPush(element: Element, attrName: string) {
  element.removeAttribute(attrName)
}