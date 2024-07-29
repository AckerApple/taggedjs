// taggedjs-no-compile

import { specialAttribute } from './specialAttribute.js'
import { isSubjectInstance } from '../../isInstance.js'
import { HowToSet, howToSetInputValue } from './howToSetInputValue.function.js'
import { bindSubjectCallback } from './bindSubjectCallback.function.js'
import { addSupportEventListener, AnySupport } from '../../tag/Support.class.js'
import { ImmutableTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js'
import { paint, paintContent } from '../../tag/paint.function.js'
import { Context, ContextItem } from '../../tag/Tag.class.js'
import { processDynamicNameValueAttribute, processNonDynamicAttr } from './processNameValueAttribute.function.js'
import { negatives } from '../../updateBeforeTemplate.function.js'
import { getNewGlobal, runOneContext, TagGlobal } from '../../tag/index.js'

type TagVarIdNum = {tagJsVar: number}
/*
export type AttrCombo = [
  string | TagVarIdNum,
  (string | null | TagVarIdNum)?, // current attribute value by using .getAttribute
]
*/

export type AttrCombo = {
}

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
    const contextItem = runOneContext(
      attrName,
      values,
      context.length,
      context,
      support
    )
    
    const global = contextItem.global as TagGlobal
    global.isAttr = true
    global.element = element

    processNameOnlyAttr(
      values,
      support,
      contextItem,
      element,
      howToSet,
      context,
    )

    contextItem.value = attrName

    return
  }

  const valueVar = getTagJsVar(value)
  if(valueVar >= 0) {
    const value = values[valueVar]
    const global = getNewGlobal()
    global.isAttr = true
    global.element = element
    global.attrName = attrName as string

    const contextItem: ContextItem = {global}
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

function processNameOnlyAttr(
  values: unknown[],
  support: AnySupport,
  contextValue: ContextItem,
  element: Element,
  howToSet: HowToSet,
  context: Context,
) {
  const global = contextValue.global as TagGlobal
  global.element = element
  global.howToSet = howToSet
  global.isNameOnly = true

  // the above callback gets called immediately since its a ValueSubject()
  const contextValueSubject = contextValue.value
  if(isSubjectInstance(contextValueSubject)) {
    const sub = contextValueSubject.subscribe(function contextValueCallback(value: any) {
      processNameOnlyAttrValue(
        values,
        value,
        contextValue.value,
        element,
        support,
        howToSet,
        context,
      )  
      paint()
    })
    const global = support.subject.global as TagGlobal
    const subs = global.subscriptions = global.subscriptions || []
    subs.push(sub) // this is where unsubscribe is picked up
    return
  }

  processNameOnlyAttrValue(
    values,
    contextValue.value,
    contextValue.value,
    element,
    support,
    howToSet,
    context,
  )
}

export function processNameOnlyAttrValue(
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
    if(lastValue instanceof Object) {
      const isObStill = attrValue instanceof Object
      if(isObStill) {
        for (const name in lastValue) {
          if(name in attrValue) {
            continue
          }
          paintContent.push(function paintContent() {
            element.removeAttribute(name)
          })
          // delete element[name]
        }
      } else {
        for (const name in lastValue) {
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

  // regular attributes
  if(typeof(attrValue) === ImmutableTypes.string) {
    if(!(attrValue as string).length) {
      return // ignore, do not set at this time
    }

    howToSet(element, attrValue as string, empty)
    return
  }

  // process an object of attributes ${{class:'something, checked:true}}
  if(attrValue instanceof Object) {
    for (const name in attrValue) {
      const value = attrValue[name]
      processAttribute(
        values,
        name,
        element,
        ownerSupport,
        howToSet,
        context,
        value,
        isSpecialAttr(name),
      )
    }
    return
  }
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
  // const isSpecial = isSpecialAttr(attrName)
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
  if(newAttrValue instanceof Function) {
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
  if(newAttrValue instanceof Function) {
    return processAttributeFunction(element, newAttrValue, support, attrName)
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

function processAttributeFunction(
  element: Element,
  newAttrValue: (...args: unknown[]) => unknown,
  support: AnySupport,
  attrName: string
) {
  const fun = function (...args: any[]) {
    return fun.tagFunction(element, args)
  }

  // access to original function
  fun.tagFunction = newAttrValue
  fun.support = support

  return applyFunToElm(attrName, element, fun, support)
}

export function applyFunToElm(
  attrName: string,
  element: Element,
  callback: (...args: unknown[]) => unknown,
  support: AnySupport,
) {
  // ;(element as any)[attrName] = callback
  addSupportEventListener(
    support.appSupport,
    attrName,
    element, // support.appSupport.appElement as Element,
    callback,
  )
  return attrName
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
  const oneRender = tagJsType === ValueTypes.oneRender
  
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
  if(attrPart && attrPart instanceof Object && 'tagJsVar' in (attrPart as TagVarIdNum))
    return (attrPart as TagVarIdNum).tagJsVar
  
  return -1
}