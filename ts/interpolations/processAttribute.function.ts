import { specialAttribute } from './specialAttribute.js'
import { isSubjectInstance } from '../isInstance.js'
import { Context, variablePrefix } from '../tag/Tag.class.js'
import { HowToSet, howToSetInputValue } from './interpolateAttributes.js'
import { bindSubjectCallback } from './bindSubjectCallback.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'
import { BasicTypes, ValueTypes, empty } from '../tag/ValueTypes.enum.js'
import { TagJsSubject } from '../tag/update/TagJsSubject.class.js'

const INPUT = 'INPUT'
const valueS = 'value'
const ondoubleclick = 'ondoubleclick'
export type AttrCombo = [
  string,
  (TagJsSubject<any> | string | null)?, // current attribute value by using .getAttribute
]

/** Sets attribute value, subscribes to value updates  */
export function processAttribute(
  attrs: AttrCombo,
  element: Element,
  scope: Context,
  support: BaseSupport | Support,
  howToSet: HowToSet = howToSetInputValue,
) {
  const attrName = attrs[0]
  const value = attrs[1]
  
  if(element.nodeName === INPUT && attrName === valueS) {
    howToSet = howToSetInputValue
  }

  const isNameVar = (attrs as any).length === 1 // isTagVar(attrName)
  if( isNameVar ) {
    const contextValueSubject = attrName as any as TagJsSubject<any>// getContextValueByVarString(scope, attrName)
    let lastValue: any;

    // the above callback gets called immediately since its a ValueSubject()
    const sub = contextValueSubject.subscribe((value: any) => {
      if(value === lastValue) {
        return // value did not change
      }

      processNameOnlyAttr(
        value,
        lastValue,
        element,
        support,
        howToSet,
      )

      lastValue = value
    })
    support.subject.global.subscriptions.push(sub) // this is where unsubscribe is picked up
    element.removeAttribute(attrName)

    return
  }

  const isSubject = value && isSubjectInstance(value)
  // const isSubject = isTagVar(value)
  if ( isSubject ) {
    return processNameValueAttr(
      attrName,
      value as TagJsSubject<any>,
      element,
      support,
      howToSet
    )
  }

  // Non dynamic
  const isSpecial = isSpecialAttr(attrName)
  if (isSpecial) {
    return specialAttribute(attrName, value, element)
  }

  howToSet(element, attrName, value as string)
}

function processNameOnlyAttr(
  attrValue: string | Record<string, any>,
  lastValue: string | Record<string, any> | undefined,
  child: Element,
  ownerSupport: BaseSupport | Support,
  howToSet: HowToSet,
) {
  // check to remove previous attribute(s)
  if(lastValue && lastValue != attrValue) {
    if(typeof(lastValue) === BasicTypes.string) {
      child.removeAttribute(lastValue as string)
    } else if(lastValue instanceof Object) {
      for (const name in lastValue) {
        child.removeAttribute(name)
      }
    }
  }

  // regular attributes
  if(typeof(attrValue) === BasicTypes.string) {
    if(!attrValue.length) {
      return
    }

    processNameValueAttr(
      attrValue as string, // name
      new TagJsSubject(empty),
      child,
      ownerSupport,
      howToSet,
    )

    return
  }

  // process an object of attributes ${{class:'something, checked:true}}
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

/** Processor for flat attributes and object attributes */
function processNameValueAttr(
  attrName: string,
  result: TagJsSubject<any>,
  child: Element,
  support: BaseSupport | Support,
  howToSet: HowToSet
) {
  // Most every variable comes in here since everything is made a ValueSubject
  if(isSubjectInstance(result)) {
    const isSpecial = isSpecialAttr(attrName)
    child.removeAttribute(attrName)
    let lastValue: any;

    const callback = (newAttrValue: any) => {
      // should the function be wrapped so every time its called we re-render?
      if(newAttrValue instanceof Function) {
        return callbackFun(
          support,
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
    support.subject.global.subscriptions.push(sub)

    return
  }


  howToSet(child, attrName, result._value)

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

    // shorthand corrections
    if(attrName === ondoubleclick) {
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
  support: BaseSupport | Support,
  newAttrValue: any,
  child: Element,
  attrName: string,
  isSpecial: boolean,
  howToSet: HowToSet,
) {
  const wrapper = support.templater.wrapper
  const parentWrap = wrapper?.parentWrap
  const tagJsType = wrapper?.tagJsType || parentWrap?.tagJsType
  const oneRender = tagJsType === ValueTypes.oneRender
  
  if(!oneRender) {
    // tag has state and will need all functions wrapped to cause re-renders
    newAttrValue = bindSubjectCallback(newAttrValue, support)
  }

  return processAttributeSubjectValue(
    newAttrValue,
    child,
    attrName,
    isSpecial,
    howToSet,
  )
}