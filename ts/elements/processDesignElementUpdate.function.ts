import { AnySupport } from '../index.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js'
import { destroyDesignElement } from './destroyDesignElement.function.js'
import { ElementFunction } from './ElementFunction.type.js'
import { MockElmListener } from './ElementVarBase.type.js'

export function processDesignElementUpdate(
  value: any,
  context: ContextItem,
  ownerSupport: AnySupport,
) {
  const skip = context.deleted === true
  if(skip) {
    return // something else is running an event
  }

  ++context.updateCount

  const hasChanged = checkTagElementValueChange(value, context)
  if( hasChanged ) {
    destroyDesignElement(context, ownerSupport)

    // delete context.htmlDomMeta // The next value needs to know its not been deleted
    context.htmlDomMeta = [] // The next value needs to know its not been deleted
    // context.deleted = true // its not deleted but changed
    delete context.deleted // its not deleted but changed

    updateToDiffValue(
      value,
      context, // newContext,
      ownerSupport,
      789,
    )

    return
  }

  const contexts = context.contexts as ContextItem[]
  const vContexts = value.contexts || []
  
  const oldElement = context.tagJsVar as ElementFunction
  const newElement = value as ElementFunction
  const ogListeners = oldElement.allListeners as MockElmListener[]
  const allListeners = newElement.allListeners
  for (let index = 0; index < allListeners.length; ++index) {
    const newListener = allListeners[index] as MockElmListener
    // ensure the latest callback is always called. Needed for functions within array maps
    const wrapCallback = ogListeners[index][1]
    wrapCallback.toCallback = newListener[1].toCallback
  }

  if(contexts.length !== vContexts.length) {
    const conValues = new Array(contexts.length)
    for (let index = 0; index < contexts.length; ++index) {
      conValues[index] = contexts[index].value
    }

    console.info('context mismatch', {
      value,
      context,
      conValues,
      vContexts,
      deleted: context.deleted,
      contexts
    })
    throw new Error(`Expected ${contexts.length} contexts but got ${vContexts.length}`)
  }

  context.locked = 79
  
  for (let index = 0; index < contexts.length; ++index) {
    const item = contexts[index]
    ;(item.tagJsVar as any).processUpdate(
      vContexts[index],
      item,
      ownerSupport,
    )
  }

  delete context.locked
}

export function checkTagElementValueChange(
  value: any,
  context: ContextItem,
) {
  if(!value) {
    return 1
  }

  const oldValue = context.value
  if(oldValue === value) {
    return 0 // has not changed
  }

  if(value.tagJsType !== 'element' || oldValue === null) {
    return 1
  }

  const newElement = value as ElementFunction
  const oldElement = oldValue as ElementFunction

  const newContentId = newElement.contentId
  const oldContentId = oldElement.contentId
  if(newContentId !== oldContentId) {
    return 1
  }

  const newKidLength = newElement.innerHTML.length
  const oldKidLength = oldElement.innerHTML.length
  const kidLengthChanged = newKidLength !== oldKidLength
  if(kidLengthChanged) {
    return 1
  }

  return 0
}
