// taggedjs-no-compile

import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js'
import { isFunction } from '../../isInstance.js'
import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { BasicTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { addOneContext } from '../index.js'
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js'
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js'
import { getTagJsVar, TagVarIdNum } from './getTagJsVar.function.js'
import { NoDisplayValue } from './NoDisplayValue.type.js'
import { SpecialDefinition } from './Special.types.js'
import { isNoDisplayValue } from './isNoDisplayValue.function.js'
import { HostValue } from '../../tagJsVars/host.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'

/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(
  values: unknown[], // all the variables inside html``
  attrName: string | TagVarIdNum,
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet, //  = howToSetInputValue
  context: ContextItem[],
  isSpecial: SpecialDefinition,
  counts: TagCounts,
  value: string | null | undefined | TagVarIdNum,
) {
  const nameVar = getTagJsVar(attrName)
  const isNameVar = nameVar >= 0

  if( isNameVar ) {
    const value = values[nameVar]
    const contextItem = addOneContext(
      value,
      context,
      true,
    )

    contextItem.isAttr = true
    contextItem.element = element
    contextItem.isNameOnly = true

    if((value as HostValue).tagJsType) {
      contextItem.tagJsVar = value as TagJsVar
      ;(contextItem as any).stateOwner = getSupportWithState(support)
      ;(contextItem as any).supportOwner = support
      return processHost(element as HTMLInputElement, value as HostValue, contextItem)
    }

    contextItem.howToSet = howToSet
    const tagJsVar = contextItem.tagJsVar
    tagJsVar.processUpdate = processUpdateAttrContext

    // stand alone attributes
    processNameOnlyAttrValue(
      values,
      value as any,
      element,
      support,
      howToSet as HowToSet,
      context,
      counts,
    )
  
    return
  }

  if(Array.isArray(value)) {
    return createDynamicArrayAttribute(
      attrName as string,
      value,
      element,
      context,
      howToSet,
      support,
      counts,
      values,
    )
  }

  const valueVar = getTagJsVar(value)
  if(valueVar >= 0) {
    const value = values[valueVar]
    return createDynamicAttribute(
      attrName as string,
      value,
      element,
      context,
      howToSet,
      support,
      counts,
      isSpecial,
    )
  }

  return processNonDynamicAttr(
    attrName as string,
    value as string,
    element,
    howToSet,
    counts,
    support,
    isSpecial,
  )
}

function processHost(
  element: HTMLInputElement,
  hostVar: HostValue,
  contextItem: ContextItem,
) {
  (hostVar as any).processInit(element, hostVar, contextItem)
  return
}

export function processNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any> | HostValue,
  element: HTMLElement,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  context: ContextItem[],
  counts: TagCounts,
) {
  if(isNoDisplayValue(attrValue)) {
    return
  }

  // process an object of attributes ${{class:'something, checked:true}}
  if(typeof attrValue === BasicTypes.object) {
    for (const name in (attrValue as any)) {
      const value = (attrValue as any)[name]
      processAttribute(
        values,
        name,
        element,
        ownerSupport,
        howToSet,
        context,
        isSpecialAttr(name), // only object variables are evaluated for is special attr
        counts,
        value,
      )
    }
    return
  }

  // regular attributes
  if((attrValue as string).length === 0) {
    return // ignore, do not set at this time
  }

  howToSet(element, attrValue as string, empty)
}

export function processAttributeEmit(
  newAttrValue: any,
  attrName: string,
  subject: ContextItem,
  element: HTMLElement,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
  counts: TagCounts,
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
      counts,
    )
  }
  
  return processAttributeSubjectValue(
    newAttrValue,
    element,
    attrName,
    isSpecial,
    howToSet,
    support,
    counts,
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
  _counts: TagCounts,
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
  subject: ContextItem,
  counts: TagCounts,
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
    counts,
  )
}

export function processTagCallbackFun(
  subject: ContextItem,
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