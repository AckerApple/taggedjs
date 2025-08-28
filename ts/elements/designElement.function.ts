import { AnySupport, InputElementTargetEvent, Subject, SupportContextItem, valueToTagJsVar } from '../index.js'
import { DomObjectElement } from '../interpolations/optimizers/ObjectNode.types.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paint, paintAppend, paintAppends, paintBefore, paintCommands, painting } from '../render/paint.function.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { destroyContextHtml } from '../tag/smartRemoveKids.function.js'
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { ReadOnlyVar } from '../tagJsVars/tagJsVar.type.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { elementFunctions } from './elementFunctions.js'

type ElementVarBase = ReadOnlyVar & {
  tagName: string
  innerHTML: any[],
  attributes: any[],
  listeners: [string, callback: (e: InputElementTargetEvent)=> any][],
}

export type ElementFunction = ((...children: (((_: any) => any) | string | boolean | object)[]) => any) & ElementVarBase

export type ElementVar = ElementFunction & ReturnType<typeof elementFunctions>

export function designElement(
  tagName: string, // div | button
): ElementVar {
  const element: ElementVarBase = {
    tagJsType: 'element',

    processInitAttribute: blankHandler,
    processInit,
    destroy,
    processUpdate,
    checkValueChange: checkTagElementValueChange,

    tagName,
    innerHTML: [],
    attributes: [],
    listeners: [],
  }

  
  const pushKid = getPushKid(element)
  
  return pushKid as ElementVar
}

export function getPushKid(element: ElementVarBase): ElementVar {
  const pushKid = (...args: any[]) => {
    const newElement = {...pushKid as any}
    newElement.attributes = [...pushKid.attributes]
    newElement.listeners = [...pushKid.listeners]
    newElement.innerHTML = args
    return newElement
  }

  Object.assign(pushKid, element)
  Object.assign(pushKid, elementFunctions(pushKid))
  pushKid.attributes = [...element.attributes]
  pushKid.listeners = [...element.listeners]
  // pushKid.innerHTML = [...element.innerHTML]

  return pushKid as ElementVar
}

function checkTagElementValueChange(
  value: any,
) {
  return !value || value.tagJsType !== 'element' ? 1 : 0
}

function processUpdate(
  value: any,
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  const hasChanged = checkTagElementValueChange(value)
  
  if( hasChanged ) {
    destroy(context)

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

function destroy(
  contextItem: ContextItem,
  // ownerSupport: AnySupport,
) {
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
    // contexts,
    context.parentContext,
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

        addedContexts.push({
          parentContext: context,
          tagJsVar: {
            tagJsType: 'dynamic-text',
            checkValueChange: () => 0,
            processInit: blankHandler,
            processInitAttribute: blankHandler,
            destroy: blankHandler,
            processUpdate: (
              value: any,
              contextItem,
              ownerSupport: AnySupport,
              values: unknown[],
            ) => {
              const newValue = item()
              return newContext.tagJsVar.processUpdate(
                newValue, newContext, ownerSupport, values,
              )
            }
          },

           // TODO: Not needed
          valueIndex: -1,
          withinOwnerElement: true,
          destroy$: new Subject(),
        })
        
        const newContext = processNonElement(item(), context, addedContexts, element, ownerSupport)
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

      const ownerContext = ownerSupport.context
      const ownerVar = ownerContext.tagJsVar

      ++painting.locks

      ownerVar.processUpdate(
        ownerContext.value,
        ownerContext,
        ownerSupport.ownerSupport as AnySupport,
        [],
      )

      --painting.locks

      paint()

      /*
      context.tagJsVar.processUpdate(
        context.value,
        context,
        ownerSupport,
        [],
      )*/
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
