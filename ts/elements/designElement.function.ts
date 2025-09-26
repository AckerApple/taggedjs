import { AnySupport, InputElementTargetEvent, isPromise, Subject, SupportContextItem, valueToTagJsVar } from '../index.js'
import { Attribute, DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paint, paintAppend, paintAppends, paintBefore, paintCommands, painting } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { destroyContextHtml } from '../tag/smartRemoveKids.function.js'
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { ReadOnlyVar } from '../tagJsVars/tagJsVar.type.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { elementFunctions } from './elementFunctions.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'
import { processElementVar } from './processElementVar.function.js'

type ElementVarBase = ReadOnlyVar & {
  tagName: string
  innerHTML: any[],
  attributes: Attribute,
  listeners: [string, callback: (e: InputElementTargetEvent)=> any][],
  elementFunctions: typeof elementFunctions,
}

export type ElementFunction = (
  (...children: (((_: any) => any) | string | boolean | object | undefined | number | null)[]) => ElementVar
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
    processUpdate,
    hasValueChanged: checkTagElementValueChange,

    tagName,
    innerHTML: [],
    attributes: [] as any,
    listeners: [],
    elementFunctions,
  }

  
  const pushKid = getPushKid(element, elementFunctions)
  
  return pushKid as ElementVar
}

export function getPushKid(
  element: ElementVarBase,
  _elmFunctions: typeof elementFunctions,
): ElementVar {
  const pushKid = (...args: any[]) => {
    const newElement = {...pushKid as any}
    newElement.attributes = [...pushKid.attributes]
    newElement.listeners = [...pushKid.listeners]
    newElement.innerHTML = args
    return newElement
  }

  Object.assign(pushKid, element)
  // Object.assign(pushKid, elmFunctions(pushKid))
  Object.assign(pushKid, elementFunctions(pushKid))
  pushKid.attributes = [...element.attributes]
  pushKid.listeners = [...element.listeners]
  // pushKid.innerHTML = [...element.innerHTML]

  return pushKid as ElementVar
}

function checkTagElementValueChange(
  value: any,
  context: ContextItem,
) {
  const oldValue = context.value
  if(oldValue === value) {
    return 0 // has not changed
  }

  // return 1 // it has changed

  const hasChanged = !value || value.tagJsType !== 'element'

  return hasChanged ? 1 : 0
}

function processUpdate(
  value: any,
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  ++context.updateCount

  const hasChanged = checkTagElementValueChange(value, context)
  
  if( hasChanged ) {
    destroyDesignElement(context, ownerSupport)

    updateToDiffValue(
      value,
      context,
      ownerSupport,
      789,
    )

    return
  }

  // how arguments get updated within function
  if( (context as SupportContextItem).updatesHandler ) {
    const updatesHandler = (context as SupportContextItem).updatesHandler as any
    updatesHandler(value.props)
  }

  const contexts = context.contexts as ContextItem[]
  contexts.forEach(context => {
    (context.tagJsVar as any).processUpdate(context.value, context, ownerSupport)
  })
}

function destroyDesignElement(
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  ++context.updateCount

  const contexts = context.contexts as ContextItem[]

  console.log('contexts===>',contexts)
  const promises: Promise<any>[] = []

  if(contexts.length) {
    destroyDesignByContexts(contexts, ownerSupport, promises)

    if( promises.length ) {
      return Promise.all(promises).then(() => {
        ++painting.locks
        destroyContextHtml(context)
        // delete context.htmlDomMeta
        context.htmlDomMeta = []
        --painting.locks
        paint()
      })
    }
  }

  destroyContextHtml(context)
  // delete context.htmlDomMeta
  context.htmlDomMeta = []
}

function destroyDesignByContexts(
  contexts: ContextItem[],
  ownerSupport: AnySupport,
  promises: Promise<any>[],
) {
  const context = contexts[0]
  const result = context.tagJsVar.destroy(context, ownerSupport)

  if( isPromise(result) ) {
    promises.push(result)
    return result.then(() => {
      if(contexts.length > 1) {
        return destroyDesignByContexts( contexts.slice(1, contexts.length), ownerSupport, promises )
      }
    })
  }

  if(context.htmlDomMeta) {
    console.log('context -->', { context, htmlDomMeta: context.htmlDomMeta })
    destroyContextHtml(context)
    delete context.htmlDomMeta
  }

  if(contexts.length > 1) {
    return destroyDesignByContexts( contexts.slice(1, contexts.length), ownerSupport, promises )
  }
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

