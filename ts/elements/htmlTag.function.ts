import { InputElementTargetEvent } from '../index.js'
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { elementFunctions, isValueForContext, loopObjectAttributes } from './elementFunctions.js'
import { elementVarToHtmlString } from './elementVarToHtmlString.function.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js'
import { processDesignElementInit } from './processDesignElementInit.function.js'
import { ElementVar } from './ElementFunction.type.js'
import { ElementVarBase } from './ElementVarBase.type.js'

export type TruthyVar = number | string | boolean | ((_: InputElementTargetEvent) => string | boolean | number)

export type Attributes = {
  onKeyup?: (_: InputElementTargetEvent) => any;
  onKeydown?: (_: InputElementTargetEvent) => any;
  onClick?: (_: InputElementTargetEvent) => any;
  onChange?: (_: InputElementTargetEvent) => any;
  onBlur?: (_: InputElementTargetEvent) => any;
  
  /** You may want to instead use "onClick" because "onclick" is a string function that runs in browser */
  onclick?: string

  /** You may want to instead use "onChange" because "onchange" is a string function that runs in browser */
  onchange?: string

  /** You may want to instead use "onBlur" because "onblur" is a string function that runs in browser */
  onblur?: string
  
  checked?: TruthyVar
  disabled?: TruthyVar
  autofocus?: TruthyVar
  // These maybe duplicate attribute typings
  class?: string | object | ((_: InputElementTargetEvent) => string | object)
  style?: string | object | ((_: InputElementTargetEvent) => string | object)
  attr?: string | object | TagJsVar | void | undefined | ((_: InputElementTargetEvent) => any)
} & {
  [attrName: string]: object | string | boolean | number | TagJsVar | undefined | void | ((_: InputElementTargetEvent) => any)
}

export function htmlTag(
  tagName: string, // div | button
  // elementFunctions: T,
): ElementVar {
  const element: ElementVarBase = {
    tagJsType: 'element',

    processInitAttribute: blankHandler,
    processInit: processDesignElementInit,
    destroy: destroyDesignElement,
    processUpdate: processDesignElementUpdate,
    hasValueChanged: checkTagElementValueChange,

    tagName,
    innerHTML: [],
    attributes: [] as any,
    listeners: [],
    allListeners: [],

    elementFunctions,
  }
  
  const pushKid = getPushKid(element, elementFunctions)
  pushKid.tagName = tagName
  
  return pushKid as ElementVar
}

export function getPushKid(
  element: ElementVarBase,
  _elmFunctions: typeof elementFunctions,
): ElementVar {
  const pushKid = (...args: any[]) => {
    const newElement: ElementVar = {...pushKid as any}
    newElement.attributes = [...pushKid.attributes] as Attribute[]
    newElement.listeners = [...pushKid.listeners]
    newElement.allListeners = [...pushKid.allListeners]

    if(
      args.length > 0 &&
      typeof args[0] === 'object' &&
      !Array.isArray(args[0]) && 
      !args[0].tagJsType // TODO: need better attribute detection
    ) {
      loopObjectAttributes(newElement, args[0])
      args.splice(0,1)
    }
    
    newElement.innerHTML = args

    // review each child for potential to be context
    args.forEach(arg => {
      if( !isValueForContext(arg) ) {
        return
      }
      
      if(arg.tagJsType === 'element') {
        newElement.allListeners.push(...arg.allListeners)

        if(arg.contexts) {
          // the argument is an element so push up its contexts into mine
          if(!newElement.contexts) {
            // newElement.contexts = [...arg.contexts]
            newElement.contexts = arg.contexts
          } else {
            newElement.contexts.push( ...arg.contexts )
          }
        }
        return
      }

      registerMockChildContext(arg, newElement)
    })

    return newElement
  }

  Object.assign(pushKid, element)
  Object.assign(pushKid, elementFunctions(pushKid))
  pushKid.attributes = [...element.attributes] as Attribute[]
  pushKid.listeners = [...element.listeners]
  pushKid.allListeners = [...element.allListeners]
  pushKid.toString = function () {
    return elementVarToHtmlString(this as any)
  }

  return pushKid as ElementVar
}


/** used during updates */
function registerMockChildContext(
  value: any,
  mockElm: ElementVar,
) {
  if(!mockElm.contexts) {
    mockElm.contexts = []
  }

  mockElm.contexts.push( value )
}
