import { InputElementTargetEvent } from '../index.js'
import { Attribute } from '../interpolations/optimizers/ObjectNode.types.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import { elementFunctions, isValueForContext } from './elementFunctions.js'
import { elementVarToHtmlString } from './elementVarToHtmlString.function.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js'
import { processDesignElementInit } from './processDesignElementInit.function.js'
import { ElementFunction } from './ElementFunction.type.js'
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
  required?: TruthyVar
  open?: TruthyVar

  // These maybe duplicate attribute typings
  class?: string | object | ((_: InputElementTargetEvent) => string | object)
  style?: string | object | ((_: InputElementTargetEvent) => string | object)
  attr?: string | object | TagJsTag<any> | void | undefined | ((_: InputElementTargetEvent) => any)
} & {
  [attrName: string]: object | string | boolean | number | TagJsTag<any> | undefined | void | ((_: InputElementTargetEvent) => any)
}

export function htmlTag(
  tagName: string, // div | button
  // elementFunctions: T,
): ElementFunction {
  const element: ElementVarBase = {
    component: false,
    tagJsType: 'element',

    processInitAttribute: blankHandler,
    processInit: processDesignElementInit,
    destroy: destroyDesignElement,
    processUpdate: processDesignElementUpdate,
    hasValueChanged: checkTagElementValueChange,

    tagName,
    innerHTML: [],
    attributes: [] as any,
    contentId: 0,
    listeners: [],
    allListeners: [],

    elementFunctions,
  }
  
  const pushKid = getPushKid(element, elementFunctions)
  pushKid.tagName = tagName
  
  return pushKid
}

export function getPushKid(
  element: ElementVarBase,
  _elmFunctions: typeof elementFunctions,
): ElementFunction {
  const pushKid = function pushKid(...args: any[]) {
    const newElement: ElementFunction = {...pushKid as any}
    newElement.attributes = cloneShallowArray(pushKid.attributes) as Attribute[]
    newElement.listeners = cloneShallowArray(pushKid.listeners)
    newElement.allListeners = cloneShallowArray(pushKid.allListeners)
    let contexts = newElement.contexts as any[] | undefined

    newElement.innerHTML = args

    // review each child for potential to be context
    for (let index = 0; index < args.length; ++index) {
      const arg = args[index]
      if( !isValueForContext(arg) ) {
        continue
      }
      
      if(arg.tagJsType === 'element') {
        appendArray(newElement.allListeners, arg.allListeners)

        if(arg.contexts) {
          if(!contexts) {
            contexts = []
            newElement.contexts = contexts
          }
          // the argument is an element so push up its contexts into mine
          appendArray(contexts, arg.contexts as any)
          ++newElement.contentId
        }
        continue
      }

      if(!contexts) {
        contexts = []
        newElement.contexts = contexts
      }
      contexts.push(arg)
    }

    return newElement
  }

  Object.assign(pushKid, element)
  assignFunctionMembers(pushKid as any, _elmFunctions(pushKid))
  pushKid.attributes = cloneShallowArray(element.attributes) as Attribute[]
  pushKid.listeners = cloneShallowArray(element.listeners)
  pushKid.allListeners = cloneShallowArray(element.allListeners)
  
  pushKid.toString = function () {
    return elementVarToHtmlString(this as any)
  }

  return pushKid as any as ElementFunction
}

function cloneShallowArray<T>(
  value: T[],
): T[] {
  return value.length ? value.slice() : []
}

function appendArray<T>(
  target: T[],
  source: T[],
) {
  for (let index = 0; index < source.length; ++index) {
    target.push(source[index] as T)
  }
}

function assignFunctionMembers(
  target: Record<string, any>,
  source: Record<string, any>,
) {
  for (const key in source) {
    const value = source[key]
    try {
      target[key] = value
    } catch {
      Object.defineProperty(target, key, {
        value,
        writable: true,
        configurable: true,
        enumerable: false,
      })
    }
  }
}
