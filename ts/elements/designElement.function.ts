import { AnySupport, InputElementTargetEvent, Subject, SupportContextItem, valueToTagJsVar } from '../index.js'
import { Attribute, DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { destroyContextHtml } from '../tag/smartRemoveKids.function.js'
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { ReadOnlyVar } from '../tagJsVars/tagJsVar.type.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { elementFunctions } from './elementFunctions.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'

type ElementVarBase = ReadOnlyVar & {
  tagName: string
  innerHTML: any[],
  attributes: Attribute,
  listeners: [string, callback: (e: InputElementTargetEvent)=> any][],
  elementFunctions: typeof elementFunctions,
}

export type ElementFunction = (
  (...children: (((_: any) => any) | string | boolean | object)[]) => ElementVar
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
  if( (context as SupportContextItem).inputsHandler ) {
    const inputsHandler = (context as SupportContextItem).inputsHandler as any
    inputsHandler(value.props)
  }

  const contexts = context.contexts as ContextItem[]
  contexts.forEach(context => {
    (context.tagJsVar as any).processUpdate(context.value, context, ownerSupport)
  })
}

function destroyDesignElement(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const contexts = contextItem.contexts as ContextItem[]
  contexts.forEach(context => 
    context.tagJsVar.destroy(context, ownerSupport)
  )

  destroyContextHtml(contextItem)
  delete contextItem.htmlDomMeta
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
  
  paintCommands.push([paintBefore, [insertBefore, element]])

  const dom: DomObjectElement = {
    nn: value.tagName,
    domElement: element,
    // marker: insertBefore,
    at: value.attributes,
  }

  context.htmlDomMeta = [dom]

  return element
}

function processElementVar(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  addedContexts: ContextItem[],
) {
  const element = document.createElement( value.tagName )
  context.element = element

  processAttributeArray(
    value.attributes,
    [], // values,
    element,
    ownerSupport,
    context, // context.parentContext,
    addedContexts,
  )

  value.innerHTML.forEach(item => {
    const type = typeof item

    switch (type) {
      case 'string':
      case 'number':
        return handleSimpleInnerValue(item, element)
      
      case 'function': {
        if(item.tagJsType === 'element') {
          const newElement = processElementVar(item, context, ownerSupport, addedContexts)
          paintAppends.push([paintAppend, [element, newElement]])
          return
        }

        const subContexts: ContextItem[] = []
        const subContext: ContextItem = {
          parentContext: context,
          contexts: subContexts,
          tagJsVar: {
            tagJsType: 'dynamic-text',
            hasValueChanged: () => 0,
            processInit: blankHandler,
            processInitAttribute: blankHandler,
            destroy: (_c, ownerSupport) => {
              subContexts.forEach(subSub =>
                subSub.tagJsVar.destroy(subSub, ownerSupport)
              )
            },
            processUpdate: (
              value: any,
              contextItem,
              ownerSupport: AnySupport,
              values: unknown[],
            ) => {
              const newValue = item(newContext)
              const result = newContext.tagJsVar.processUpdate(
                newValue, newContext, ownerSupport, values,
              )
              newContext.value = newValue
              return result
            }
          },

           // TODO: Not needed
          valueIndex: -1,
          withinOwnerElement: true,
          destroy$: new Subject(),
        }

        addedContexts.push(subContext)
        
        const newContext = processNonElement(
          item(),
          context,
          subContext.contexts as ContextItem[], // addedContexts,
          element,
          ownerSupport,
        )

        return newContext
        // const textElement = handleSimpleInnerValue(item(), element)
        // return textElement
      }
    }

    if(item.tagJsType === 'element') {
      const newElement = processElementVar(item, context, ownerSupport, addedContexts)
      paintAppends.push([paintAppend, [element, newElement]])
      return
    }

    processNonElement(item, context, addedContexts, element, ownerSupport)
  })

  value.listeners.forEach(listener => {
    const wrap = (...args: any[]) => {
      const result = (listener[1] as any)(...args)
      const stateSupport = getSupportWithState(ownerSupport)
      renderTagUpdateArray([stateSupport])
      return result
    }

    addSupportEventListener(
      ownerSupport.appSupport,
      listener[0], // eventName
      element,
      wrap,
    )
  })

  return element
}

function processNonElement(
  item: any,
  context: ContextItem,
  addedContexts: ContextItem[],
  element: HTMLElement,
  ownerSupport: AnySupport,
) {
  const tagJsVar = valueToTagJsVar(item)
  const newContext: ContextItem = {
    value: item,
    parentContext: context,
    tagJsVar,

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }
  
  addedContexts.push(newContext)
  newContext.placeholder = document.createTextNode('')
  paintAppends.push([paintAppend, [element, newContext.placeholder]])

  tagJsVar.processInit(
    item,
    newContext, // context, // newContext,
    ownerSupport,
    newContext.placeholder
  )

  return newContext
}

function handleSimpleInnerValue(
  value: number | string,
  element: HTMLElement,
) {
  const text = document.createTextNode(value as string)
  paintAppends.push([paintAppend, [element, text]])
  return text
}
