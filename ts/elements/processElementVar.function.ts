import { AnySupport, isPromise } from '../index.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { afterTagCallback } from '../interpolations/attributes/bindSubjectCallback.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { isSpecialAttr } from '../interpolations/attributes/isSpecialAttribute.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paint, paintAppend, painting } from '../render/paint.function.js'
import { ContextItem } from '../tag/index.js'
import { ElementVar, MockElmListener } from './htmlTag.function.js'
import { processChildren } from './processChildren.function.js'

/** The first and recursive processor for elements */
export function processElementVar(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  _addedContexts: ContextItem[],
) {
  const element = document.createElement(value.tagName)
  context.element = element

  // mark special attributes
  value.attributes.forEach(x => {
    const name = x[0]
    if(typeof(name) !== 'string') {
      return
    }

    x[2] = isSpecialAttr(name)
  })

  processAttributeArray(
    value.attributes,
    [], // values,
    element,
    ownerSupport,
    context, // context.parentContext,
    // context.contexts as ContextItem[], // addedContexts,
  )

  /*
  value.listeners.forEach((listener, index) => 
    registerListener(value, index, ownerSupport, listener, element)
  )*/

  processChildren(
    value.innerHTML,
    context, // parentContext
    ownerSupport,
    element,
    paintAppend,
  )

  value.listeners.forEach((listener, index) => 
    registerListener(value, index, ownerSupport, listener, element)
  )

  return element
}

function registerListener(
  value: ElementVar,
  index: number,
  ownerSupport: AnySupport,
  listener: MockElmListener,
  element: HTMLElement,
) {
  const wrap = (...args: any[]) => {
    const listenScope = value.listeners[index]
    const toCall = listenScope[1]
    const stateSupport = getSupportWithState(ownerSupport)
    const updateCount = stateSupport.context.updateCount

    stateSupport.context.locked = 1
    ++painting.locks

    const result = (toCall as any)(...args)

    --painting.locks
    delete stateSupport.context.locked

    const needsRender = updateCount === stateSupport.context.updateCount

    if (needsRender) {
      return afterTagCallback(result, stateSupport)
    } else {
      paint()
    }

    if (isPromise(result)) {
      return result.then(() => {
        const newest = stateSupport.context.state.newest as AnySupport
        renderTagUpdateArray([newest])
        return 'promise-no-data-ever'
      })
    }

    return 'no-data-ever'
  }

  addSupportEventListener(
    ownerSupport.appSupport,
    listener[0], // eventName
    element,
    wrap
  )
}
