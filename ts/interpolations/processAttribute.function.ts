import { specialAttribute } from './specialAttribute.js'
import { isSubjectInstance } from '../isInstance.js'
import { Context } from '../tag/Tag.class.js'
import { HowToSet } from './interpolateAttributes.js'
import { bindSubjectCallback } from './bindSubjectCallback.function.js'
import { TagSupport } from '../tag/TagSupport.class.js'

const startRegX = /^\s*{__tagvar/
const endRegX = /}\s*$/
function isTagVar(value: string | null) {
  return value && value.search(startRegX) >= 0 && value.search(endRegX) >= 0
}

export function processAttribute(
  attrName: string,
  value: string | null, // current attribute value by using .getAttribute
  child: Element,
  scope: Context,
  ownerSupport: TagSupport,
  howToSet: HowToSet,
) {
  if ( isTagVar(value) ) {  
    return processScopedNameValueAttr(
      attrName,
      value as string,
      child,
      scope,
      ownerSupport,
      howToSet,
    )
  }

  if( isTagVar(attrName) ) {  
    const contextValueSubject = getContextValueByVarString(scope, attrName)
    let lastValue: any;

    // the above callback gets called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe((value: any) => {
      if(value === lastValue) {
        return // value did not change
      }

      processNameOnlyAttr(
        value,
        lastValue,
        child,
        ownerSupport,
        howToSet,
      )

      lastValue = value
    })
    ownerSupport.global.subscriptions.push(sub) // this is where unsubscribe is picked up
    child.removeAttribute(attrName)

    return
  }

  // Non dynamic
  const isSpecial = isSpecialAttr(attrName)
  if (isSpecial) {
    return specialAttribute(attrName, value, child)
  }
}

function processScopedNameValueAttr(
  attrName: string,
  value: string, // {__tagVarN}
  child: Element,
  scope: Context,
  ownerSupport: TagSupport,
  howToSet: HowToSet
) {
  // get the code inside the brackets like "variable0" or "{variable0}"
  const result = getContextValueByVarString(scope, value)
  return processNameValueAttr(
    attrName,
    result,
    child,
    ownerSupport,
    howToSet
  )
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
  ownerSupport: TagSupport,
  howToSet: HowToSet,
) {
  if(lastValue && lastValue != attrValue) {
    if(typeof(lastValue) === 'string') {
      child.removeAttribute(lastValue as string)
    } else if(lastValue instanceof Object) {
      for (const name in lastValue) {
        child.removeAttribute(name)
      }
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
      ownerSupport,
      howToSet,
    )

    return
  }

  if(attrValue instanceof Object) {
    for (const name in attrValue) {
      processNameValueAttr(
        name,
        attrValue[name],
        child,
        ownerSupport,
        howToSet,
      )
    }
  }
}

function processNameValueAttr(
  attrName: string,
  result: any,
  child: Element,
  ownerSupport: TagSupport,
  howToSet: HowToSet
) {
  const isSpecial = isSpecialAttr(attrName)

  if(result instanceof Function) {
    const action = function(...args: any[]) {
      const result2 = result(child, args)
      return result2
    }
    
    ;(child as any)[attrName].action = action
  }

  // Most every variable comes in here since everything is made a ValueSubject
  if(isSubjectInstance(result)) {
    child.removeAttribute(attrName)
    let lastValue: any;

    const callback = (newAttrValue: any) => {
      // should the function be wrapped so every time its called we re-render?
      if(newAttrValue instanceof Function) {
        return callbackFun(
          ownerSupport,
          newAttrValue,
          child,
          attrName,
          isSpecial,
          howToSet,
        )
      }

      // TODO: we maybe able to block higher before instance of check
      if(lastValue === newAttrValue) {
        return lastValue
      }

      lastValue = newAttrValue
      
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
    ownerSupport.global.subscriptions.push(sub)

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

    if(attrName === 'ondoubleclick') {
      attrName = 'ondblclick'
    }

    ;(child as any)[attrName] = fun

    return
  }

  if (isSpecial) {
    specialAttribute(attrName, newAttrValue, child)
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

function callbackFun(
  ownerSupport: TagSupport,
  newAttrValue: any,
  child: Element,
  attrName: string,
  isSpecial: boolean,
  howToSet: HowToSet,
) {
  const wrapper = ownerSupport.templater.wrapper
  const parentWrap = wrapper?.parentWrap
  const oneRender = parentWrap?.oneRender
  if(!oneRender) {
    newAttrValue = bindSubjectCallback(newAttrValue, ownerSupport)
  }
  
  return processAttributeSubjectValue(
    newAttrValue,
    child,
    attrName,
    isSpecial,
    howToSet,
  )  
}