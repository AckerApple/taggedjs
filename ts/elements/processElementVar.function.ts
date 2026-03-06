import { AnySupport, isPromise } from '../index.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { afterTagCallback } from '../interpolations/attributes/bindSubjectCallback.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { isSpecialAttr } from '../interpolations/attributes/isSpecialAttribute.function.js'
import { renderTagUpdate } from '../interpolations/attributes/renderTagArray.function.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paint, paintAppend, painting } from '../render/paint.function.js'
import { removeContextInCycle, setContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { ContextItem } from '../tag/index.js'
import { ElementFunction } from './ElementFunction.type.js'
import { MockElmListener } from './ElementVarBase.type.js'
import { processChildren } from './processChildren.function.js'

/** The first and recursive processor for elements */
export function processElementVar(
  value: ElementFunction,
  context: ContextItem,
  ownerSupport: AnySupport,
  _addedContexts: ContextItem[],
) {
  const tagName = value.tagName
  const element = document.createElement(tagName)
  context.target = element

  // mark special attributes
  const attributes = value.attributes
  for (let index = 0; index < attributes.length; ++index) {
    const x = attributes[index]
    const name = x[0]
    if(typeof(name) !== 'string') {
      continue
    }

    x[2] = isSpecialAttr(name, tagName)
  }

  processAttributeArray(
    attributes,
    [], // values,
    element,
    ownerSupport,
    context, // context.parentContext,
    // context.contexts as ContextItem[], // addedContexts,
  )

  /* process children BEFORE attributes for  `<select value="1">` to work */
  processChildren(
    value.innerHTML,
    context, // parentContext
    ownerSupport,
    element,
    paintAppend,
  )

  const listeners = value.listeners
  for (let index = 0; index < listeners.length; ++index) {
    registerListener(value, index, ownerSupport, listeners[index], element)
  }

  return element
}

function registerListener(
  value: ElementFunction,
  index: number,
  ownerSupport: AnySupport,
  listener: MockElmListener,
  element: HTMLElement,
) {
  const eventName = listener[0]
  const wrap = (...args: any[]) => {
    const listenScope = value.listeners[index]
    const toCall = listenScope[1]
    const stateSupport = getSupportWithState(ownerSupport)
    const stateContext = stateSupport.context
    const updateCount = stateContext.updateCount

    stateContext.locked = 1 // 1 means reactive event lock
    ++painting.locks
    setContextInCycle(stateContext)

    const result = (toCall as any)(...args)

    --painting.locks
    delete stateContext.locked
    removeContextInCycle()

    const needsRender = updateCount === stateContext.updateCount

    if (needsRender) {
      return afterTagCallback(result, stateSupport)
    } else {
      paint()
    }

    if (isPromise(result)) {
      return result.then(() => {
        const newest = stateSupport.context.state.newest as AnySupport
        renderTagUpdate(newest)
        return 'promise-no-data-ever'
      })
    }

    return 'no-data-ever'
  }

  addSupportEventListener(
    ownerSupport.appSupport,
    eventName,
    element,
    wrap
  )
}
