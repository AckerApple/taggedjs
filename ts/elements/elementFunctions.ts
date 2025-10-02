import { isFunction, isObject, isPromise } from '../index.js';
import { HowToSet, setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid, ElementVar } from './designElement.function.js'

export function elementFunctions(item: any) {
  /** Used for all element callbacks */
  function makeCallback(eventName: string) {
    return function (callback: (e: InputElementTargetEvent) => any) {
      const clone = getPushKid(item as any, item.elementFunctions);
      function wrapCallback(e: InputElementTargetEvent) {
        return wrapCallback.toCallback(e)
      }
      wrapCallback.toCallback = callback
      
      clone.listeners.push([eventName, wrapCallback])
      clone.allListeners.push([eventName, wrapCallback])
      
      return clone
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

  return {
    onClick: makeCallback('click'),    
    onChange: makeCallback('onchange'),
    onKeyup: makeCallback('onkeyup'),

    /* apply attribute via attr(name: string, value?: any): **/
    attr: function (
      ...args: [name: string | unknown, value?: any]
    ) {
      const clone = getPushKid(item as any, item.elementFunctions)
      clone.attributes.push(args as Attribute)

      if( isValueForContext(args[0]) ) {
        registerMockAttrContext(args[0], clone) // the attrName is a function or TagJsVar
      } else if( isValueForContext(args[1]) ) {
        registerMockAttrContext(args[1], clone) // the attrValue is a function or TagJsVar
      }

      return clone
    },

    /** element.setAttribute('style', x)  */
    style: makeAttributeHandler('style', setNonFunctionInputValue),
    class: makeAttributeHandler('class', setClassValue),
    id: makeAttributeHandler('id', setNonFunctionInputValue),
    
    // only for certain elements
    placeholder: makeAttributeHandler('placeholder', setNonFunctionInputValue),
    value: makeAttributeHandler('value', setNonFunctionInputValue),
    type: makeAttributeHandler('type', setNonFunctionInputValue),
    
    /** sets or removes selected attribute by checking for any truthy value */
    selected: makeAttributeHandler('selected', setBooleanAttribute),
    
    /** sets or removes checked attribute by checking for any truthy value */
    checked: makeAttributeHandler('checked', setBooleanAttribute),
    
    /** Used for setting array index-key value */
    key: function (arrayValue: any) {
     ;(this as any).arrayValue = arrayValue
     return this
    },
  }
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