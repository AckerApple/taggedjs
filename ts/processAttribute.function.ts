import { inputAttribute } from './inputAttribute'
import { isSubjectInstance } from './isInstance'
import { Context, Tag } from './Tag.class'
import { HowToSet } from './interpolateAttributes'
import { getSubjectFunction } from './Tag.utils'
import { bindSubjectCallback } from './bindSubjectCallback.function'

const startRegX = /^\s*{__tagvar/
const endRegX = /}\s*$/
function isTagVar(value: string | null) {
  return value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0
}

export function processAttribute(
  attrName: string,
  value: string | null,
  child: Element,
  scope: Context,
  ownerTag: Tag,
  howToSet: HowToSet,
) {
  if ( isTagVar(value) ) {  
    return processScopedNameValueAttr(
      attrName,
      value as string,
      child,
      scope,
      ownerTag,
      howToSet,
    )
  }

  if( isTagVar(attrName) ) {  
    const contextValueSubject = getContextValueByVarString(scope, attrName)
    let lastValue: any;

    // the above callback gets called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe((value: any) => {
      processNameOnlyAttr(
        value,
        lastValue,
        child,
        ownerTag,
        howToSet,
      )

      lastValue = value
    })
    ownerTag.tagSupport.templater.global.subscriptions.push(sub) // this is where unsubscribe is picked up
    child.removeAttribute(attrName)

    return
  }

  // Non dynamic
  const isSpecial = isSpecialAttr(attrName)
  if (isSpecial) {
    return inputAttribute(attrName, value, child)
  }
}

function processScopedNameValueAttr(
  attrName: string,
  value: string, // {__tagVarN}
  child: Element,
  scope: Context,
  ownerTag: Tag,
  howToSet: HowToSet
) {
  // get the code inside the brackets like "variable0" or "{variable0}"
  const result = getContextValueByVarString(scope, value)
  return processNameValueAttr(attrName, result, child, ownerTag, howToSet)
}

function getContextValueByVarString(
  scope: Context,
  value: string,
) {
  const code = value.replace('{','').split('').reverse().join('').replace('}','').split('').reverse().join('')
  return scope[code]
}
function processNameOnlyAttr(
  attrValue: string | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  child: Element,
  ownerTag: Tag,
  howToSet: HowToSet,
) {
  if(lastValue && lastValue != attrValue) {
    if(typeof(lastValue) === 'string') {
      child.removeAttribute(lastValue as string)
    } else if(lastValue instanceof Object) {
      Object.entries(lastValue).forEach(([name]) =>
        child.removeAttribute(name)
      )
    }
  }

  if(typeof(attrValue) === 'string') {
    if(!attrValue.length) {
      return
    }

    processNameValueAttr(
      attrValue as string,
      '',
      child,
      ownerTag,
      howToSet,
    )

    return
  }

  if(attrValue instanceof Object) {
    Object.entries(attrValue).forEach(([name, value]) =>
      processNameValueAttr(
        name,
        value,
        child,
        ownerTag,
        howToSet,
      )
    )

    return
  }
}

function processNameValueAttr(
  attrName: string,
  result: any,
  child: Element,
  ownerTag: Tag,
  howToSet: HowToSet
) {
  const isSpecial = isSpecialAttr(attrName)

  // attach as callback?
  if(result instanceof Function) {
    const action = function(...args: any[]) {
      const result2 = result(child, args)
      return result2
    }
    
    ;(child as any)[attrName].action = action
    // child.addEventListener(attrName, action)
  }

  // Most every variable comes in here since everything is made a ValueSubject
  if(isSubjectInstance(result)) {
    child.removeAttribute(attrName)
    const callback = (newAttrValue: any) => {
      if(newAttrValue instanceof Function) {
        newAttrValue = bindSubjectCallback(newAttrValue, ownerTag)
      }
      
      return processAttributeSubjectValue(
        newAttrValue,
        child,
        attrName,
        isSpecial,
        howToSet,
      )
    }

    // 🗞️ Subscribe. Above callback called immediately since its a ValueSubject()
    const sub = result.subscribe(callback as any)
    
    // Record subscription for later unsubscribe when element destroyed
    ownerTag.tagSupport.templater.global.subscriptions.push(sub)

    return
  }

  howToSet(child, attrName, result)
  // child.setAttribute(attrName, result.value)
  return
}

export type NoDisplayValue = false | null | undefined
type DisplayValue = ((...args: unknown[]) => unknown) | string | boolean

function processAttributeSubjectValue(
  newAttrValue: DisplayValue | NoDisplayValue,
  child: Element,
  attrName: string,
  isSpecial: boolean,
  howToSet: HowToSet,
) {  
  if(newAttrValue instanceof Function) {
    const fun = function(...args: any[]) {
      return newAttrValue(child, args)
    }

    // access to original function
    fun.tagFunction = newAttrValue

    ;(child as any)[attrName] = fun

    return
  }

  if (isSpecial) {
    inputAttribute(attrName, newAttrValue, child)
    return
  }

  if(newAttrValue) {
    howToSet(child, attrName, newAttrValue as string)
    return
  }

  const isDeadValue = [undefined, false, null].includes(newAttrValue as NoDisplayValue)
  if(isDeadValue) {
    child.removeAttribute(attrName)
    return
  }

  // value is 0
  howToSet(child, attrName, newAttrValue as string)
}

/** Looking for (class | style) followed by a period */
function isSpecialAttr(
  attrName: string | String
) {
  return attrName.search(/^(class|style)(\.)/) >= 0
}
