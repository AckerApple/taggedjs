import { AnySupport, ElementVar } from '../index.js'
import { paintBefore } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { elementFunctions } from './elementFunctions.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js'
import { processChildren } from './processChildren.function.js'
import { ElementVarBase, getPushKid } from './designElement.function.js'

/** used when you do NOT have a root element returned for your function */
export const noElement = noElementMaker()

export function noElementMaker(): ElementVar {
  const element: ElementVarBase = {
    tagJsType: 'element',

    processInitAttribute: blankHandler, // its never an attribute
    
    processInit: processNoElmInit,

    destroy: destroyDesignElement,
    processUpdate: processDesignElementUpdate,
    hasValueChanged: checkTagElementValueChange,

    tagName: 'no-element',
    innerHTML: [],
    attributes: [] as any,
    listeners: [],
    allListeners: [],

    elementFunctions,
  }
  
  const pushKid = getPushKid(element, elementFunctions)
  pushKid.tagName = 'no-element'
  
  return pushKid as ElementVar
}

function processNoElmInit(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  // appendTo?: Element,
) {
  context.contexts = [] // added contexts
  processChildren(
    value.innerHTML,
    context,
    ownerSupport,
    context.contexts,
    insertBefore as unknown as HTMLElement,
    paintBefore,
  )
}

