import { ContextItem, isFunction, isObject } from '../index.js';
import { HowToSet, setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid } from './htmlTag.function.js'
import { makeAttrCallable, AttributeCallable } from './attributeCallables.js'
import { AttrValue, ElementVar } from './ElementFunction.type.js';

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

export type Attrs = { [name:string]: AttrValue }

/** attrs({names: values}) */
function attrs(
  item: any,
  args: Attrs,
) {
  const clone = getPushKid(item as any, item.elementFunctions)

  Object.entries(args).map(args => {
    clone.attributes.push(args as unknown as Attribute)
  
    if( isValueForContext(args[0]) ) {
      registerMockAttrContext(args[0], clone) // the attrName is a function or TagJsVar
    } else if( isValueForContext(args[1]) ) {
      registerMockAttrContext(args[1], clone) // the attrValue is a function or TagJsVar
    }
  })

  return clone
}

const styleCallable = makeAttrCallable('style', attr)
const idCallable = makeAttrCallable('id', attr)
const classCallable = makeAttrCallable('class', attr)
const hrefCallable = makeAttrCallable('href', attr)
const valueCallable = makeAttrCallable('value', attr)
const placeholderCallable = makeAttrCallable('placeholder', attr)
const typeCallable = makeAttrCallable('type', attr)

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

  // TODO: This maybe the old way of doing things (see callables)
  // This seems to be for supporting div.onClick()
  const callables_other = {
    // ...eventCallables,
    onClose: makeCallback('onclose'),
    onDoubleClick: makeCallback('ondblclick'),
    onClick: makeCallback('click'),
    // onclick: makeCallback('click'),
    // click: makeCallback('click'),

    onBlur: makeCallback('onblur'),
    onChange: makeCallback('onchange'),
    onInput: makeCallback('oninput'),
    // onchange: makeCallback('onchange'),
    // change: makeCallback('onchange'),
    
    onMousedown: makeCallback('onmousedown'),
    onMouseup: makeCallback('onmouseup'),
    onMouseover: makeCallback('onmouseover'),
    onMouseout: makeCallback('onmouseout'),
    
    onKeydown: makeCallback('onkeydown'),
    
    onKeyup: makeCallback('onkeyup'),
    // onkeyup: makeCallback('onkeyup'),
    // keyup: makeCallback('onkeyup'),
   
    /* apply attribute via attr(name: string, value?: any): **/
    attr: (...args: any[]) => attr(item, args as any),
    attrs: (attributes: Attrs) => attrs(item, attributes),
        
    /** Used for setting array index-key value */
    key: function (arrayValue: any) {
     ;(this as any).arrayValue = arrayValue
     return this
    },

    /** Use as div.style`border:${border}` or div.style(() => `border:${border}`) */
    style: ((stringsOrValue: any | ((_?: ContextItem) => string), ...values: any[]) => {
      return styleCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as div.id`main` or div.id(() => `main-${1}`) */
    id: ((stringsOrValue: any, ...values: any[]) => {
      return idCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as div.class`primary` or div.class(() => `primary`) */
    class: ((stringsOrValue: any, ...values: any[]) => {
      return classCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as a.href`/path` or a.href(() => `/path`) */
    href: ((stringsOrValue: any, ...values: any[]) => {
      return hrefCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as input.value`text` or input.value(() => `${value}`) */
    value: ((stringsOrValue: any, ...values: any[]) => {
      return valueCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as input.placeholder`text` or input.placeholder(() => `${value}`) */
    placeholder: ((stringsOrValue: any, ...values: any[]) => {
      return placeholderCallable(item, stringsOrValue, values)
    }) as AttributeCallable,

    /** Use as input.type`text` or input.type(() => `${value}`) */
    type: ((stringsOrValue: any, ...values: any[]) => {
      return typeCallable(item, stringsOrValue, values)
    }) as AttributeCallable,
  }

  return callables_other
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

const eventCallables = {
  onClose: makeCallback('onclose'),
  onClick: makeCallback('click'),
  
  onDoubleClick: makeCallback('ondblclick'),
  onDblClick: makeCallback('ondblclick'),

  onBlur: makeCallback('onblur'),
  onChange: makeCallback('onchange'),
  onInput: makeCallback('oninput'),
  
  onMousedown: makeCallback('onmousedown'),
  onMouseDown: makeCallback('onmousedown'),
  onMouseup: makeCallback('onmouseup'),
  onMouseUp: makeCallback('onmouseup'),
  onMouseover: makeCallback('onmouseover'),
  onMouseOver: makeCallback('onmouseup'),
  onMouseout: makeCallback('onmouseout'),
  onMouseOut: makeCallback('onmouseout'),

  onKeyup: makeCallback('onkeyup'),
  onKeyUp: makeCallback('onkeyup'),
  
  onKeydown: makeCallback('onkeydown'),
  onKeyDown: makeCallback('onkeydown'),
}

const callables = {
  checked: setupAttr('checked', setBooleanAttribute),
  selected: setupAttr('selected', setBooleanAttribute),

  /** element.setAttribute('style', x)  */
  class: setupAttr('class', setClassValue),

  ...eventCallables
}

export function loopObjectAttributes(
  item: ElementVar,
  object: any,
) {
  const result = Object.entries(object).reduce((all, [name, value]) => {
    if(name in callables) {
      return (callables as any)[name](item, value)
    }

    return attr2(item, [name, value, false, setNonFunctionInputValue] as any)
  }, item) as ElementVar

  return result
}
