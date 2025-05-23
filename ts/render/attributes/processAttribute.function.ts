// taggedjs-no-compile

import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js'
import { isFunction, isObject } from '../../isInstance.js'
import { HowToSet } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { BasicTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/AnySupport.type.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processDynamicNameValueAttribute, processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { addOneContext } from '../index.js'
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js'
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'

type TagVarIdNum = {tagJsVar: number}
export type SpecialAction = 'init' | 'destroy'
export type SpecialDefinition = boolean | SpecialAction | 'class' | 'style' | 'autofocus' | 'autoselect'

/** MAIN FUNCTION. Sets attribute value, subscribes to value updates  */
export function processAttribute(
  values: unknown[],
  attrName: string | TagVarIdNum,
  element: Element,
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
    contextItem.howToSet = howToSet
    contextItem.isNameOnly = true

    // how to process value updates
    contextItem.handler = processUpdateAttrContext

    processNameOnlyAttrValue(
      values,
      value as any,
      element as Element,
      support,
      howToSet as HowToSet,
      context,
      counts,
    )
  
    return
  }

  const valueVar = getTagJsVar(value)
  if(valueVar >= 0) {
    const value = values[valueVar]

    const contextItem: ContextItem = {
      isAttr: true,
      element,
      attrName: attrName as string,
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

    return
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

export function processNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any>,
  element: Element,
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

/** Processor for flat attributes and object attributes */
/*
function processNameValueAttributeAttrSubject(
  attrName: string,
  contextItem: ContextItem,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial: SpecialDefinition,
  counts: TagCounts,
) {
  if(isSpecial) {
    paintContent.push(function paintContent() {
      element.removeAttribute(attrName)
    })
  }

  const contextValueSubject = contextItem.value
  if(isSubjectInstance(contextValueSubject)) {
    contextItem.handler = blankHandler

    const callback = function processAttrCallback(newAttrValue: any) {
      processAttributeEmit(
        newAttrValue,
        attrName,
        contextItem,
        element,
        support,
        howToSet,
        isSpecial,
        counts,
      )
    }
  
    // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe(callback as any)
    
    // Record subscription for later unsubscribe when element destroyed
    const global = contextItem.global as TagGlobal
    const subs = global.subscriptions = global.subscriptions || []
    subs.push(sub)
  }

  processAttributeEmit(
    contextItem.value,
    attrName,
    contextItem,
    element,
    support,
    howToSet,
    isSpecial,
    counts,
  )

  return
}
*/

export function processAttributeEmit(
  newAttrValue: any,
  attrName: string,
  subject: ContextItem,
  element: Element,
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

export type NoDisplayValue = false | null | undefined
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

export function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  element: Element,
  attrName: string,
  special: SpecialDefinition,
  howToSet: HowToSet,
  support: AnySupport,
  counts: TagCounts,
) {
  // process adding/removing style. class. (false means remove)
  if ( special !== false ) {
    specialAttribute(
      attrName,
      newAttrValue,
      element,
      special, // string name of special
      support,
      counts,
    )
    return
  }

  switch (newAttrValue) {
    case undefined:
    case false:
    case null:
      paintContent.push(function paintContentPush() {
        element.removeAttribute(attrName)
      })
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
  element: Element,
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

  return processAttributeFunction(element, newAttrValue, support, attrName)
}

function getTagJsVar(
  attrPart: string | TagVarIdNum | null | undefined
) {
  if(isObject(attrPart) && 'tagJsVar' in (attrPart as TagVarIdNum))
    return (attrPart as TagVarIdNum).tagJsVar
  
  return -1
  // return (attrPart as TagVarIdNum)?.tagJsVar || -1
}

export function isNoDisplayValue(attrValue: any) {
  return undefined === attrValue || null === attrValue || false === attrValue
}
