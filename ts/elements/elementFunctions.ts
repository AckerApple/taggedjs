import { isObject } from '../index.js';
import { HowToSet, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid, ElementFunction } from './designElement.function.js'

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
    return function (value: any) {
      const clone = getPushKid(item as any, item.elementFunctions)
      clone.attributes.push([attrName, value, false, howToSet])
      return clone;
    };
  }

  const elmAttachments = {
    onClick: makeCallback('click'),    
    onChange: makeCallback('onchange'),

    // nameValue: function (name: string, value: any): ElementFunction {
    attr: function (name: string, value: any): ElementFunction {
      const clone = getPushKid(item as any, item.elementFunctions);
      clone.attributes.push([name, value]);
      return clone;
    },
    style: makeAttributeHandler('style', setNonFunctionInputValue),
    class: makeAttributeHandler('class', setClassValue),
    id: makeAttributeHandler('id', setNonFunctionInputValue),
    
    // only for certain elements
    placeholder: makeAttributeHandler('placeholder', setNonFunctionInputValue),
    value: makeAttributeHandler('value', setNonFunctionInputValue),
    type: makeAttributeHandler('type', setNonFunctionInputValue),
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
