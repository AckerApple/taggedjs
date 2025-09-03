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

  function makeAttributeHandler(attrName: string) {
    return function (value: any) {
      const clone = getPushKid(item as any, item.elementFunctions);
      clone.attributes.push([attrName, value]);
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
    style: makeAttributeHandler('style'),
    id: makeAttributeHandler('id'),
    
    value: makeAttributeHandler('value'),
    type: makeAttributeHandler('type'),
  }

  return elmAttachments
};
