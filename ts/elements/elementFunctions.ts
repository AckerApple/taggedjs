import { isFunction, isObject } from '../index.js';
import { HowToSet, setBooleanAttribute, setNonFunctionInputValue, setSimpleAttribute } from '../interpolations/attributes/howToSetInputValue.function.js';
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { getPushKid } from './htmlTag.function.js'
import { makeAttrCallable, AttributeCallable, AttrCallableInternal } from './attributeCallables.js'
import { AttrValue, ElementFunction } from './ElementFunction.type.js';

function callbackWrapper(
  item: ElementFunction,
  eventName: string,
  callback: (e: InputElementTargetEvent) => any
) {
  const clone = getPushKid(item as any, item.elementFunctions);
  return callbackWrapper2(clone, eventName, callback)
}

function callbackWrapper2(
  item: ElementFunction,
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
  item: ElementFunction,
  args: [name: string | unknown, value?: any]
): ElementFunction {
  // return processSetAttribute(args[0], args[1], item)


  // processSetAttribute(args[0], args[1], item)
  const clone = getPushKid(item as any, item.elementFunctions)
  processSetAttribute(args[0], args[1], clone)
  return clone
}

export type Attrs = { [name:string]: AttrValue }

/** attrs({names: values}) */
function attrs(
  item: any,
  args: Attrs,
) {
  const clone = getPushKid(item as any, item.elementFunctions)

  for (const name in args) {
    if(!Object.prototype.hasOwnProperty.call(args, name)) {
      continue
    }

    const value = (args as Record<string, AttrValue>)[name]
    clone.attributes.push([name, value] as unknown as Attribute)
    bumpContentId(clone, value)
  
    if( isValueForContext(name) ) {
      registerMockAttrContext(name, clone) // the attrName is a function or TagJsTag
    } else if( isValueForContext(value) ) {
      registerMockAttrContext(value, clone) // the attrValue is a function or TagJsTag
    }
  }

  return clone
}

// any added here need to appear within `ts/elements/ElementFunction.type.ts`
const ATTRIBUTE_CALLABLE_DEFS: Array<[apiName: string, attrName: string]> = [
  ['alt', 'alt'],
  ['ariaLabel', 'aria-label'],
  ['referrerPolicy', 'referrerpolicy'],
  ['autoFocus', 'autoFocus'],
  ['border', 'border'],
  ['id', 'id'],
  ['for', 'for'],
  ['fill', 'fill'],
  ['content', 'content'],
  ['charset', 'charset'],
  ['cellPadding', 'cellpadding'],
  ['cellSpacing', 'cellspacing'],
  ['class', 'class'],
  ['href', 'href'],
  ['lang', 'lang'],
  ['loading', 'loading'],
  ['value', 'value'],
  ['placeholder', 'placeholder'],
  ['src', 'src'],
  ['title', 'title'],
  ['width', 'width'],
  ['height', 'height'],
  ['type', 'type'],
  ['min', 'min'],
  ['max', 'max'],
  ['step', 'step'],
  ['name', 'name'],
  ['wrap', 'wrap'],
  ['checked', 'checked'],
  ['disabled', 'disabled'],
  ['selected', 'selected'],
  ['minLength', 'minLength'],
  ['maxLength', 'maxLength'],
  ['open', 'open'],
  ['rel', 'rel'],
  ['rows', 'rows'],
  ['style', 'style'],
  ['target', 'target'],
  ['viewBox', 'viewBox'],
  ['valign', 'valign'],
]

const attributeCallableHandlers = Object.fromEntries(
  ATTRIBUTE_CALLABLE_DEFS.map(([apiName, attrName]) => [apiName, makeAttrCallable(attrName, attr)])
) as Record<string, AttrCallableInternal>

const ELEMENT_EVENT_DEFS: Array<[apiName: string, eventName: string]> = [
  ['onClose', 'onclose'],
  ['onCancel', 'oncancel'],
  ['onDoubleClick', 'ondblclick'],
  ['onClick', 'click'],
  ['onBlur', 'onblur'],
  ['onChange', 'onchange'],
  ['onInput', 'oninput'],
  ['contextMenu', 'contextmenu'],
  
  ['onMouseDown', 'onmousedown'],
  ['onMouseUp', 'onmouseup'],
  ['onMouseOver', 'onmouseover'],
  ['onMouseOut', 'onmouseout'],
  
  ['onKeyDown', 'onkeydown'],
  ['onKeyUp', 'onkeyup'],
]

function attr2(
  item: ElementFunction,
  args: [name: string | unknown, value?: any]
) {
  item.attributes.push(args as Attribute)
  bumpContentId(item, args[1])

  if( isValueForContext(args[0]) ) {
    registerMockAttrContext(args[0], item) // the attrName is a function or TagJsTag
  } else if( isValueForContext(args[1]) ) {
    registerMockAttrContext(args[1], item) // the attrValue is a function or TagJsTag
  }

  return item
}

const sharedElementFunctionMembers = (() => {
  const eventCallables = Object.fromEntries(
    ELEMENT_EVENT_DEFS.map(([apiName, eventName]) => [
      apiName,
      function thisEventCallable(this: ElementFunction, callback: (e: InputElementTargetEvent) => any) {
        return callbackWrapper(this, eventName, callback)
      },
    ])
  )

  const attributeCallables = Object.fromEntries(
    Object.entries(attributeCallableHandlers).map(([apiName, handler]) => [apiName, makeAttr(handler)])
  )

  // element ids can act as array keys
  const ogId = attributeCallables.id
  attributeCallables.id = function thisIdCallable(this: ElementFunction, ...args: any[]) {
    const first = args[0]
    ;(this as any).arrayValue = typeof first === 'function' ? first() : first
    return (ogId as any).apply(this, args)
  }

  return {
    ...eventCallables,
    /* apply attribute via attr(name: string, value?: any): **/
    attr: function thisAttr(this: ElementFunction, ...args: any[]) {
      return attr(this, args as any)
    },
    attrs: function thisAttrs(this: ElementFunction, attributes: Attrs) {
      return attrs(this, attributes)
    },

    /** Used for setting array index-key value */
    key: function (this: ElementFunction, arrayValue: any) {
      ;(this as any).arrayValue = arrayValue
      return this
    },
    ...attributeCallables,
  }
})()

export function elementFunctions(_item: any) {
  return sharedElementFunctionMembers
}

function bumpContentId(
  item: ElementFunction,
  attrValue: any,
) {
  let bump = 1
  if(attrValue != null && typeof attrValue !== 'function' && typeof attrValue.length === 'number') {
    bump += attrValue.length
  }

  item.contentId += bump
}

function makeAttr(
  handler: AttrCallableInternal,
) {
  return (function attrCallable(this: ElementFunction, stringsOrValue: any, ...values: any[]) {
    return handler(this, stringsOrValue, values)
  }) as AttributeCallable
}

function setClassValue(
  element: HTMLElement,
  name: string,
  value: string | undefined | boolean | Record<string, any>
) {
  if (isObject(value)) {
    for (const className in (value as Record<string, any>)) {
      if(!Object.prototype.hasOwnProperty.call(value, className)) {
        continue
      }

      const classValue = (value as Record<string, any>)[className]
      if(classValue) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    }
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
  mockElm: ElementFunction,
) {
  if(!mockElm.contexts) {
    mockElm.contexts = []
  }

  mockElm.contexts.push(value)
  ++mockElm.contentId
}

export function isValueForContext(value: any) {
  return Array.isArray(value) || isFunction(value) || value?.tagJsType
}

function setupAttr(attrName: string, howToSet: HowToSet) {
  return (item: ElementFunction, value: any) => attr2(item, [attrName, value, false, howToSet] as any)
}

function makeCallback(eventName: string) {
  return (item: ElementFunction, callback: (e: InputElementTargetEvent) => any) => {
    return callbackWrapper2(item, eventName, callback)
  }
}

const objectAttrEventCallables = Object.fromEntries([
  ['onClick', makeCallback('click')],
  ['onDoubleClick', makeCallback('ondblclick')],
  ['onDblClick', makeCallback('ondblclick')],
  ['onDblClick', makeCallback('ondblclick')],
  ['onBlur', makeCallback('onblur')],
  ['onChange', makeCallback('onchange')],
  ['onCancel', makeCallback('oncancel')],
  ['onClose', makeCallback('onclose')],
  ['onInput', makeCallback('oninput')],
  ['onMousedown', makeCallback('onmousedown')],
  ['onMouseDown', makeCallback('onmousedown')],
  ['onMouseup', makeCallback('onmouseup')],
  ['onMouseUp', makeCallback('onmouseup')],
  ['onMouseover', makeCallback('onmouseover')],
  ['onMouseOver', makeCallback('onmouseup')],
  ['onMouseout', makeCallback('onmouseout')],
  ['onMouseOut', makeCallback('onmouseout')],
  ['onKeyup', makeCallback('onkeyup')],
  ['onKeyUp', makeCallback('onkeyup')],
  ['onKeydown', makeCallback('onkeydown')],
  ['onKeyDown', makeCallback('onkeydown')],
]) as Record<string, (item: ElementFunction, value: any) => ElementFunction>

const callables = Object.assign(
  Object.fromEntries(
    ['checked', 'disabled', 'selected'].map(attrName => [attrName, setupAttr(attrName, setBooleanAttribute)])
  ) as Record<string, (item: ElementFunction, value: any) => ElementFunction>,
  {
    /** element.setAttribute('style', x)  */
    class: setupAttr('class', setClassValue),
  },
  objectAttrEventCallables,
)

export function loopObjectAttributes(
  item: ElementFunction,
  object: any,
) {
  for (const name in object) {
    if(!Object.prototype.hasOwnProperty.call(object, name)) {
      continue
    }

    processSetAttribute(name, object[name], item)
  }

  return item
}

function processSetAttribute(
  name: any,
  value: any,
  item: ElementFunction,
): ElementFunction {
  if(name in callables) {
    return (callables as any)[name](item, value)
  }

  return attr2(item, [name, value, false, setNonFunctionInputValue] as any)
}
