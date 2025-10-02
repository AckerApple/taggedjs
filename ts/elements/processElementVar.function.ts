import { AnySupport, isPromise, Subject, valueToTagJsVar } from '../index.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paintAppends, paintAppend } from '../render/paint.function.js'
import { ContextItem } from '../tag/index.js'
import { ElementVar } from './designElement.function.js'
import { processElementVarFunction } from './processElementVarFunction.function.js'

export function processElementVar(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  addedContexts: ContextItem[],
) {
  const element = document.createElement(value.tagName)
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
    if (item.tagJsType === 'element') {
      const newElement = processElementVar(
        item,
        context,
        ownerSupport,
        addedContexts, // addedContexts, // TODO: remove
      )
      paintAppends.push([paintAppend, [element, newElement]]);
      return;
    }
    
    const type = typeof item

    switch (type) {
      case 'string':
      case 'number':
        return handleSimpleInnerValue(item, element)

      case 'function':
        return processElementVarFunction(
          item,
          element,
          context,
          ownerSupport,
          addedContexts,
        )
    }

    return processNonElement(item, context, addedContexts, element, ownerSupport)
  })

  value.listeners.forEach((listener, index) => {
    const wrap = (...args: any[]) => {
      const listenScope = value.listeners[index]
      const toCall = listenScope[1]
      const stateSupport = getSupportWithState(ownerSupport)
      const updateCount = stateSupport.context.updateCount

      const result = (toCall as any)(...args)

      if( updateCount === stateSupport.context.updateCount ) {
        renderTagUpdateArray([stateSupport])
      }


      if( isPromise(result) ) {
        return result.then(() => {
          renderTagUpdateArray([stateSupport.context.state.newest as AnySupport])
          return 'promise-no-data-ever'
        })
      }

      return 'no-data-ever'
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

export function processNonElement(
  item: any,
  context: ContextItem,
  addedContexts: ContextItem[],
  element: HTMLElement,
  ownerSupport: AnySupport,
) {
  const tagJsVar = valueToTagJsVar(item)
  const newContext: ContextItem = {
    updateCount: 0,
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

export function handleSimpleInnerValue(
  value: number | string,
  element: HTMLElement,
) {
  const text = document.createTextNode(value as string)
  paintAppends.push([paintAppend, [element, text]])
  return text
}