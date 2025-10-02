import { AnySupport, SupportContextItem } from '../index.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'
import { ElementVar, MockElmListener } from './designElement.function.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'

export function processDesignElementUpdate(
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
  const vContexts = value.contexts || []
  
  const ogListeners = (context.tagJsVar as ElementVar).allListeners as MockElmListener[]
  const allListeners = (value as ElementVar).allListeners
  allListeners.forEach((newListener, index) => {
    // ensure the latest callback is always called. Needed for functions within array maps
    const wrapCallback = ogListeners[index][1]
    wrapCallback.toCallback = newListener[1].toCallback
  })

 contexts.forEach((context, index) => {
    (context.tagJsVar as any).processUpdate(
      vContexts[index], // context.value,
      context,
      ownerSupport,
    )
  })
}

export function checkTagElementValueChange(
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