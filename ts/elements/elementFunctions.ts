import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid, ElementFunction } from './designElement.function.js'

export const elementFunctions = (item: any) => {
  function makeCallback(eventName: string) {
    return function (callback: (e: InputElementTargetEvent) => any) {
      const clone = getPushKid(item as any);
      clone.listeners.push([eventName, callback]);
      return clone;
    };
  }

  function makeAttributeHandler(attrName: string) {
    return function (value: any): ElementFunction {
      const clone = getPushKid(item as any);
      clone.attributes.push([attrName, value]);
      return clone;
    };
  }

  return {
    click: makeCallback('click'),
    change: makeCallback('onchange'),

    // nameValue: function (name: string, value: any): ElementFunction {
    attr: function (name: string, value: any): ElementFunction {
      const clone = getPushKid(item as any);
      clone.attributes.push([name, value]);
      return clone;
    },
    style: makeAttributeHandler('style'),
    value: makeAttributeHandler('value'),
    id: makeAttributeHandler('id'),
  };
};
