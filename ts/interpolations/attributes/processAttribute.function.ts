// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { isFunction, isObject, isSubjectInstance } from '../../isInstance.js'
import { HowToSet } from './howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from './bindSubjectCallback.function.js'
import { BasicTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/Support.class.js'
import { paintContent } from '../../tag/paint.function.js'
import { Context, ContextItem } from '../../tag/Context.types.js'
import { processDynamicNameValueAttribute, processNonDynamicAttr } from './processNameValueAttribute.function.js'
import { negatives } from '../../updateBeforeTemplate.function.js'
import { checkSimpleValueChange, runOneContext, TagGlobal } from '../../tag/index.js'
import { processAttributeFunction } from './processAttributeCallback.function.js'

type TagVarIdNum = {tagJsVar: number}

/** Sets attribute value, subscribes to value updates  */
export function processAttribute(
  values: unknown[],
  attrName: string | TagVarIdNum,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet, //  = howToSetInputValue
  context: Context,
  value?: string | null | TagVarIdNum,
  isSpecial?: boolean,
) {
  const nameVar = getTagJsVar(attrName)
  const isNameVar = nameVar >= 0

  if( isNameVar ) {
    const value = values[nameVar]
    const contextItem = runOneContext(
      value,
      context,
      true,
    )

    contextItem.isAttr = true
    contextItem.element = element
    contextItem.howToSet = howToSet
    contextItem.isNameOnly = true

    processNameOnlyAttrValue(
      values,
      value as any,
      element as Element,
      support,
      howToSet as HowToSet,
      context,
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
      checkValueChange: checkSimpleValueChange,
      withinOwnerElement: true,
    }

    context.push(contextItem)

    const isSubject = isSubjectInstance(contextItem.value)
    if ( isSubject ) {
      return processNameValueAttributeAttrSubject(
        attrName as string,
        contextItem,
        element,
        support,
        howToSet,
        isSpecial,
      )
    }

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

    return
  }

  return processNonDynamicAttr(
    attrName as string,
    value as string,
    element,
    howToSet,
    isSpecial,
  )
}

export function updateNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  element: Element,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  context: Context,
) {
  // check to remove previous attribute(s)
  if(lastValue) {
    if(typeof(lastValue) === BasicTypes.object) {
      const isObStill = typeof(attrValue) === BasicTypes.object
      if(isObStill) {
        for (const name in (lastValue as object)) {
          // if((attrValue as any)[name]) {
            if(name in (attrValue as any)) {
            continue
          }
          paintContent.push(function paintContent() {
            element.removeAttribute(name)
          })
          // delete element[name]
        }
      } else {
        for (const name in (lastValue as object)) {
          paintContent.push(function paintContent() {
            element.removeAttribute(name)
          })
          // delete element[name]
        }
      }
    }

    if([undefined, null, false].includes(attrValue as any)) {
      element.removeAttribute(lastValue as string)
      return
    }
  }

  processNameOnlyAttrValue(values, attrValue, element, ownerSupport, howToSet, context)
}

export function processNameOnlyAttrValue(
  values: unknown[],
  attrValue: string | boolean | Record<string, any>,
  element: Element,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
  context: Context,
) {
  if([undefined, null, false].includes(attrValue as any)) {
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
        value,
        isSpecialAttr(name), // only object variables are evaluated for is special attr
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
function processNameValueAttributeAttrSubject(
  attrName: string,
  result: ContextItem,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial?: boolean,
) {
  if(isSpecial) {
    paintContent.push(function paintContent() {
      element.removeAttribute(attrName)
    })
  }

  const contextValueSubject = result.value
  if(isSubjectInstance(contextValueSubject)) {
    const callback = function processAttrCallback(newAttrValue: any) {
      processAttributeEmit(
        newAttrValue,
        attrName,
        result,
        element,
        support,
        howToSet,
        isSpecial,
      )
    }
  
    // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe(callback as any)
    
    // Record subscription for later unsubscribe when element destroyed
    const global = result.global as TagGlobal
    const subs = global.subscriptions = global.subscriptions || []
    subs.push(sub)
  }

  processAttributeEmit(
    result.value,
    attrName,
    result,
    element,
    support,
    howToSet,
    isSpecial,
  )

  return
}

export function processAttributeEmit(
  newAttrValue: any,
  attrName: string,
  subject: ContextItem,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet,
  isSpecial?: boolean,
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

export type NoDisplayValue = false | null | undefined
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

export function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  element: Element,
  attrName: string,
  isSpecial: boolean | undefined,
  howToSet: HowToSet,
  support: AnySupport,
) {
  if(isFunction(newAttrValue)) {
    return processAttributeFunction(element, newAttrValue as Callback, support, attrName)
  }
  
  if (isSpecial) {
    specialAttribute(attrName, newAttrValue, element)
    return
  }

  const isDeadValue = negatives.includes(newAttrValue as NoDisplayValue)
  if(isDeadValue) {
    paintContent.push(function paintContentPush() {
      element.removeAttribute(attrName)
    })
    return
  }

  // value is 0
  howToSet(element, attrName, newAttrValue as string)
}


/** Looking for (class | style) followed by a period */
export function isSpecialAttr(
  attrName: string
) {
  if(isSpecialAction(attrName)) {
    return true
  }

  return attrName.startsWith('class.') || attrName.startsWith('style.')
}

export function isSpecialAction(attrName: string) {
  return ['autoselect', 'autofocus', 'oninit'].includes(attrName)
}

function callbackFun(
  support: AnySupport,
  newAttrValue: any,
  element: Element,
  attrName: string,
  isSpecial: boolean | undefined,
  howToSet: HowToSet,
  subject: ContextItem,
) {
  const wrapper = support.templater.wrapper
  const parentWrap = wrapper?.parentWrap
  const tagJsType = wrapper?.tagJsType || parentWrap?.tagJsType
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
  subject: ContextItem,
  newAttrValue: any,
  support: AnySupport,
  attrName: string,
  element: Element,
) {
  const prevFun = subject.value
  if(prevFun && prevFun.tagFunction && prevFun.support) {
    prevFun.tagFunction = newAttrValue
    prevFun.support = support
    return prevFun
  }

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
