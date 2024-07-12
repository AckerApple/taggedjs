import { specialAttribute } from './specialAttribute.js'
import { isSubjectInstance } from '../../isInstance.js'
import { HowToSet, howToSetInputValue } from './howToSetInputValue.function.js'
import { bindSubjectCallback } from './bindSubjectCallback.function.js'
import { AnySupport } from '../../tag/Support.class.js'
import { ImmutableTypes, ValueTypes, empty } from '../../tag/ValueTypes.enum.js'
import { paint, paintContent } from '../../tag/paint.function.js'
import { ContextItem } from '../../tag/Tag.class.js'
import { processNameValueAttribute } from './processNameValueAttribute.function.js'

type TagVarIdNum = {tagJsVar: number}

export type AttrCombo = [
  string | TagVarIdNum,
  (string | null | TagVarIdNum)?, // current attribute value by using .getAttribute
]

/** Sets attribute value, subscribes to value updates  */
export function processAttribute(
  attrs: AttrCombo,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet = howToSetInputValue,
) {
  const attrName = attrs[0]
  const value = attrs[1]
  const nameVar = getTagJsVar(attrName)
  // const isNameVar = (attrs as any).length === 1 || nameVar >= 0 // isTagVar(attrName)
  const isNameVar = nameVar >= 0 // isTagVar(attrName)

  if( isNameVar ) {
    const contextItem = support.subject.global.context[ nameVar ]
    contextItem.global.isAttr = true
    contextItem.global.element = element
    return processNameOnlyAttr(
      support,
      contextItem,
      element,
      howToSet,
    )
  }

  const valueVar = getTagJsVar(value)
  if(valueVar >= 0) {
    const contextItem = support.subject.global.context[ valueVar ]
    contextItem.global.isAttr = true
    contextItem.global.element = element
    contextItem.global.attrName = attrName as string

    const isSubject = isSubjectInstance(contextItem.value)
    if ( isSubject ) {
      return processNameValueAttributeAttrSubject(
        attrName as string,
        contextItem,
        element,
        support,
        howToSet
      )
    }


    return processNameValueAttribute(
      attrName as string,
      contextItem,
      element,
      howToSet,
      support,
    )  
  }

  return processNameValueAttribute(
    attrName as string,
    value,
    element,
    howToSet,
    support,
  )
}

function processNameOnlyAttr(
  support: AnySupport,
  contextValue: ContextItem,
  element: Element,
  howToSet: HowToSet,
) {
  contextValue.global.element = element
  contextValue.global.howToSet = howToSet
  contextValue.global.isNameOnly = true

  // the above callback gets called immediately since its a ValueSubject()
  const contextValueSubject = contextValue.value
  if(isSubjectInstance(contextValueSubject)) {
    const sub = contextValueSubject.subscribe((value: any) => {
      processNameOnlyEmit(value, support, contextValue, element, howToSet)  
      paint()
    })
    support.subject.global.subscriptions.push(sub) // this is where unsubscribe is picked up
    return
  }

  processNameOnlyEmit(contextValue.value, support, contextValue, element, howToSet)
}

export function processNameOnlyEmit(
  value: any,
  support: AnySupport,
  subject: ContextItem,
  element: Element,
  howToSet: HowToSet,
) {
  const global = subject.global
  if(value === global.lastValue) {
    return // value did not change
  }

  processNameOnlyAttrValue(
    value,
    subject.global.lastValue,
    element,
    support,
    howToSet,
  )
}

function processNameOnlyAttrValue(
  attrValue: string | boolean | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  element: Element,
  ownerSupport: AnySupport,
  howToSet: HowToSet,
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
          paintContent.push(() => element.removeAttribute(name))
          // delete element[name]
        }
      } else {
        for (const name in lastValue) {
          paintContent.push(() => element.removeAttribute(name))
          // delete element[name]
        }
      }
    }

    if(attrValue === undefined || attrValue === null || attrValue === false) {
      element.removeAttribute(lastValue as string)
      return
    }
  }

  // process an object of attributes ${{class:'something, checked:true}}
  if(attrValue instanceof Object) {
    for (const name in attrValue) {
      processAttribute(
        [name, attrValue[name]],
        element,
        ownerSupport,
        howToSet
      )
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
}

/** Processor for flat attributes and object attributes */
function processNameValueAttributeAttrSubject(
  attrName: string,
  result: ContextItem,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet
) {
  const isSpecial = isSpecialAttr(attrName)
  if(isSpecial) {
    paintContent.push(() => element.removeAttribute(attrName))
  }

  const contextValueSubject = result.value
  if(isSubjectInstance(contextValueSubject)) {
    const callback = (newAttrValue: any) => {
      processAttributeEmit(
        isSpecial,
        newAttrValue,
        attrName,
        result,
        element,
        support,
        howToSet,
      )
    }
  
    // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe(callback as any)
    
    // Record subscription for later unsubscribe when element destroyed
    result.global.subscriptions.push(sub)
  }

  processAttributeEmit(
    isSpecial,
    result.value,
    attrName,
    result,
    element,
    support,
    howToSet,
  )

  return
}

export function processAttributeEmit(
  isSpecial: boolean,
  newAttrValue: any,
  attrName: string,
  subject: ContextItem,
  element: Element,
  support: AnySupport,
  howToSet: HowToSet
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
    subject,
  )
}

export type NoDisplayValue = false | null | undefined
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

export function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  element: Element,
  attrName: string,
  isSpecial: boolean,
  howToSet: HowToSet,
  support: AnySupport,
  subject: ContextItem,
) {
  if(newAttrValue instanceof Function) {
    return processAttributeFunction(element, newAttrValue, support, attrName)
  }

  // its already the same value
  if(subject.global.lastValue === newAttrValue) {
    return subject.global.lastValue
  }
  
  if (isSpecial) {
    specialAttribute(attrName, newAttrValue, element)
    return
  }

  const isDeadValue = [undefined, false, null].includes(newAttrValue as NoDisplayValue)
  if(isDeadValue) {
    paintContent.push(() => element.removeAttribute(attrName))
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

  return applyFunToElm(attrName, element, fun)
}

export function applyFunToElm(
  attrName: string,
  element: Element,
  fun: (...args: unknown[]) => unknown,
) {
  (element as any)[attrName] = fun
  return attrName
}

/** Looking for (class | style) followed by a period */
export function isSpecialAttr(
  attrName: string | String
) {
  return attrName.search(/^(class|style)(\.)/) >= 0
}

function callbackFun(
  support: AnySupport,
  newAttrValue: any,
  element: Element,
  attrName: string,
  isSpecial: boolean,
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
    subject
  )
}

export function processTagCallbackFun(
  subject: ContextItem,
  newAttrValue: any,
  support: AnySupport,
  attrName: string,
  element: Element,
) {
  const prevFun = subject.global.lastValue
  if(prevFun && prevFun.tagFunction && prevFun.support) {
    prevFun.tagFunction = newAttrValue
    prevFun.support = support
    return prevFun
  }

  // tag has state and will need all functions wrapped to cause re-renders
  newAttrValue = bindSubjectCallback(newAttrValue, support)
  subject.global.lastValue = newAttrValue

  return processAttributeFunction(element, newAttrValue, support, attrName)
}

function getTagJsVar(
  attrPart: string | TagVarIdNum | null | undefined
) {
  if(attrPart && attrPart instanceof Object && 'tagJsVar' in (attrPart as TagVarIdNum))
    return (attrPart as TagVarIdNum).tagJsVar
  
  return -1
}