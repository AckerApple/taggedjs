import { AnySupport, InputElementTargetEvent } from '../index.js'
import { Attribute, DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { paintBefore, paintCommands } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { ReadOnlyVar, TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { elementFunctions, isValueForContext, loopObjectAttributes, registerMockChildContext } from './elementFunctions.js'
import { processElementVar } from './processElementVar.function.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js'

export type MockElmListener = [
  string,
  callback: ((e: InputElementTargetEvent)=> any) & {toCallback: any},
  // realCallback: (e: InputElementTargetEvent)=> any,
]

type ElementVarBase = ReadOnlyVar & {
  tagName: string
  innerHTML: any[],
  attributes: Attribute[],
  elementFunctions: typeof elementFunctions,
  
  /** Children and self contexts all together */
  contexts?: TagJsVar[]
  
  /** Just this element listeners */
  listeners: MockElmListener[]
  /** Parent and Child elements listeners */
  allListeners: MockElmListener[]
}

export type ElementFunction = (
  (
    ...children: (
      ((_: any) => any) | string | boolean | undefined | number | null | object | {
        onKeyup: (_: InputElementTargetEvent) => any;
        onClick: (_: InputElementTargetEvent) => any;
        onChange: (_: InputElementTargetEvent) => any;
      } & {
        [attr: string]: string | ((_: ContextItem) => any)
      }
    )[]
  ) => any
) & ElementVarBase

export type ElementVar = ElementFunction & ReturnType<typeof elementFunctions>

export function designElement(
  tagName: string, // div | button
  // elementFunctions: T,
): ElementVar {
  const element: ElementVarBase = {
    tagJsType: 'element',

    processInitAttribute: blankHandler,
    processInit,
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
      if( isValueForContext(arg) ) {
        if(arg.tagJsType === 'element') {
          newElement.allListeners.push(...arg.allListeners)

          if(arg.contexts) {
            // the argument is an element so push up its contexts into mine
            if(!newElement.contexts) {
              newElement.contexts = arg.contexts
            } else {
              newElement.contexts.push( ...arg.contexts )
            }
          }
          return
        }

        registerMockChildContext(arg, newElement)
      }
    })

    return newElement
  }

  Object.assign(pushKid, element)
  Object.assign(pushKid, elementFunctions(pushKid))
  pushKid.attributes = [...element.attributes] as Attribute[]
  pushKid.listeners = [...element.listeners]
  pushKid.allListeners = [...element.allListeners]

  return pushKid as ElementVar
}


function processInit(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  // appendTo?: Element,
) {
  context.contexts = []
  const element = processElementVar(value, context, ownerSupport, context.contexts)
  
  paintCommands.push([paintBefore, [insertBefore, element, 'designElement.processInit']])

  const dom: DomObjectElement = {
    nn: value.tagName,
    domElement: element,
    // marker: insertBefore,
    at: value.attributes,
  }

  context.htmlDomMeta = [dom]

  return element
}

