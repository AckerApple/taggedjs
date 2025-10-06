import { ContextItem, isFunction, isObject, isPromise } from '../index.js';
import { HowToSet, setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid, ElementVar } from './designElement.function.js'

function callbackWrapper(
  item: ElementVar,
  eventName: string,
  callback: (e: InputElementTargetEvent) => any
) {
  const clone = getPushKid(item as any, item.elementFunctions);

  return callbackWrapper2(clone, eventName, callback)
}

function callbackWrapper2(
  item: ElementVar,
  eventName: string,
  callback: (e: InputElementTargetEvent) => any
) {
  function wrapCallback(e: InputElementTargetEvent) {
    return wrapCallback.toCallback(e)
  }
  wrapCallback.toCallback = callback
  
  item.listeners.push([eventName, wrapCallback])
  item.allListeners.push([eventName, wrapCallback])
  
  return item
}

function attr(
  item: any,
  args: [name: string | unknown, value?: any]
) {
  const clone = getPushKid(item as any, item.elementFunctions)
  clone.attributes.push(args as Attribute)

  if( isValueForContext(args[0]) ) {
    registerMockAttrContext(args[0], clone) // the attrName is a function or TagJsVar
  } else if( isValueForContext(args[1]) ) {
    registerMockAttrContext(args[1], clone) // the attrValue is a function or TagJsVar
  }

  return clone
}

function attr2(
  item: ElementVar,
  args: [name: string | unknown, value?: any]
) {
  // const clone = getPushKid(item as any, item.elementFunctions)
  // clone.attributes.push(args as Attribute)
  item.attributes.push(args as Attribute)

  if( isValueForContext(args[0]) ) {
    registerMockAttrContext(args[0], item) // the attrName is a function or TagJsVar
  } else if( isValueForContext(args[1]) ) {
    registerMockAttrContext(args[1], item) // the attrValue is a function or TagJsVar
  }

  return item
}

export function elementFunctions(item: any) {
  /** Used for all element callbacks */
  function makeCallback(eventName: string) {
    return function (callback: (e: InputElementTargetEvent) => any) {
      return callbackWrapper(item,eventName,callback)
    }
  }

  function makeAttributeHandler(
    attrName: string,
    howToSet: HowToSet,
  ) {
    return function (
      value: ((...args: any[]) => any) | string | object
    ) {
      const clone = getPushKid(item as any, item.elementFunctions)
      clone.attributes.push([attrName, value, false, howToSet])

      if(isValueForContext(value)) {
        registerMockAttrContext(value, clone)
      }

      return clone
    };
  }

  const callables = {
    onClick: makeCallback('click'),    
    // onclick: makeCallback('click'),
    // click: makeCallback('click'),

    onChange: makeCallback('onchange'),
    // onchange: makeCallback('onchange'),
    // change: makeCallback('onchange'),
    
    onKeyup: makeCallback('onkeyup'),
    // onkeyup: makeCallback('onkeyup'),
    // keyup: makeCallback('onkeyup'),

    /* apply attribute via attr(name: string, value?: any): **/
    attr: (...args: any[]) => attr(item, args as any),
        
    /** Used for setting array index-key value */
    key: function (arrayValue: any) {
     ;(this as any).arrayValue = arrayValue
     return this
    },
  }

  return callables
}

function setClassValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  if (isObject(value)) {
    Object.entries(value as object).forEach(([name, value]) => {
      if(value) {
        element.classList.add(name)
      } else {
        element.classList.remove(name)
      }
    })
    return// howToSetInputObjectValue(element, name, value as Record<string, any>)
  }
  
  setSimpleAttribute(
    element,
    name,
    value
  )
}

/** used during updates */
export function registerMockAttrContext(
  value: any,
  mockElm: ElementVar,
) {
  if(!mockElm.contexts) {
    mockElm.contexts = []
  }

  mockElm.contexts.push(value)
}

/** used during updates */
export function registerMockChildContext(
  value: any,
  mockElm: ElementVar,
) {
  if(!mockElm.contexts) {
    mockElm.contexts = []
  }

  mockElm.contexts.push( value )
}

export function isValueForContext(value: any) {
  return Array.isArray(value) || isFunction(value) || value?.tagJsType
}

function setupAttr(attrName: string, howToSet: HowToSet) {
  return (item: ElementVar, value: any) => attr2(item, [attrName, value, false, howToSet] as any)
}

function makeCallback(eventName: string) {
  return (item: ElementVar, callback: (e: InputElementTargetEvent) => any) => {
    return callbackWrapper2(item, eventName, callback)
  }
}

const callables = {
  checked: setupAttr('checked', setBooleanAttribute),
  selected: setupAttr('selected', setBooleanAttribute),

  /** element.setAttribute('style', x)  */
  class: setupAttr('class', setClassValue),

  onClick: makeCallback('click'),
  onChange: makeCallback('onchange'),
  onKeyup: makeCallback('onkeyup'),
}

export function loopObjectAttributes(
  item: ElementVar,
  object: any,
) {
  const result = Object.entries(object).reduce((all, [name, value]) => {
    if(name in callables) {
      return (callables as any)[name](item, value)
    }

    // return item[name](value)
    // return attr2(all, [name, value] as any)
    return attr2(item, [name, value, false, setNonFunctionInputValue] as any)
  }, item) as ElementVar

  return result
}