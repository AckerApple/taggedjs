import { AnySupport, ElementVar } from '../index.js'
import { paint, paintBefore, painting } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { elementFunctions } from './elementFunctions.js'
import { destroyDesignByContexts } from './destroyDesignElement.function.js'
import { processDesignElementUpdate, checkTagElementValueChange } from './processDesignElementUpdate.function.js'
import { processChildren } from './processChildren.function.js'
import { ElementVarBase, getPushKid } from './designElement.function.js'
import { destroyContextHtml } from '../tag/smartRemoveKids.function.js'

/** used when you do NOT have a root element returned for your function */
export const noElement = noElementMaker()

export function noElementMaker(): ElementVar {
  const element: ElementVarBase = {
    tagJsType: 'element',

    processInitAttribute: blankHandler, // its never an attribute
    
    processInit: processNoElmInit,

    destroy: destroyNoElement,
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
  context.htmlDomMeta = []
  
  processChildren(
    value.innerHTML,
    context,
    ownerSupport,
    context.contexts,
    insertBefore as unknown as HTMLElement,
    paintBefore,
  )
}

function destroyNoElement(
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  ++context.updateCount

  const contexts = context.contexts as ContextItem[]
  const promises: Promise<any>[] = []

  if(contexts.length) {
    destroyDesignByContexts(contexts, ownerSupport, promises)

    if( promises.length ) {
      return Promise.all(promises).then(() => {

        ++painting.locks
        destroyContextHtml(context)
        context.htmlDomMeta = []
        --painting.locks
        
        paint()
      })
    }
  }
}