import { AnySupport, isPromise } from '../index.js'
import { addSupportEventListener } from '../interpolations/attributes/addSupportEventListener.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'
import { isSpecialAttr } from '../interpolations/attributes/isSpecialAttribute.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'
import { processAttributeArray } from '../render/dom/processAttributeArray.function.js'
import { paintAppend } from '../render/paint.function.js'
import { ContextItem } from '../tag/index.js'
import { ElementVar } from './designElement.function.js'
import { processChildren } from './processChildren.function.js'

export function processElementVar(
  value: ElementVar,
  context: ContextItem,
  ownerSupport: AnySupport,
  addedContexts: ContextItem[],
) {
  const element = document.createElement(value.tagName)
  context.element = element

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
    addedContexts,
  )

  processChildren(
    value.innerHTML,
    context,
    ownerSupport,
    addedContexts,
    element,
    paintAppend,
  )

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
