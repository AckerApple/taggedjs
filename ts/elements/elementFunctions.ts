import { isObject } from '../index.js';
import { HowToSet, setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid, ElementFunction, ElementVar } from './designElement.function.js'

export const elementFunctions = (item: any) => {
  function makeCallback(eventName: string) {
    return function (callback: (e: InputElementTargetEvent) => any) {
      const clone = getPushKid(item as any, item.elementFunctions);
      clone.listeners.push([eventName, callback]);
      return clone;
    };
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
      return clone
    };
  }

  const elmAttachments = {
    onClick: makeCallback('click'),    
    onChange: makeCallback('onchange'),
    onKeyup: makeCallback('onkeyup'),

    /* apply attribute via attr(name: string, value?: any): **/
    attr: function (
      ...args: [name: string | unknown, value?: any]
    ) {
      const clone = getPushKid(item as any, item.elementFunctions)
      clone.attributes.push(args)
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

  return elmAttachments
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
