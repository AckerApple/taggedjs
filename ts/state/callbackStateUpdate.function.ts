import { AnySupport, SupportContextItem, TemplateValue } from '../index.js'
//import { renderSupport } from '../render/renderSupport.function.js'
import { Callback } from './callbackMaker.function.js'
import { isPromise } from '../isInstance.js'
import { StatesSetter } from './states.utils.js'
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js'

export default function callbackStateUpdate<T>(
  context: SupportContextItem,
  _oldStates: StatesSetter[],
  callback: Callback<any, any,any, any, any, any, T>,
  ...args: any[]
): T {
  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  const newestSupport = findStateSupportUpContext(context)
  
  // TODO: This if may not be ever doing anything
  if(!newestSupport) {
    return maybePromise
  }

  // context.global && 
  if(newestSupport.context.global) {
    // renderSupport(newestSupport) // TODO: remove with html``
  } else {
    const supContext = newestSupport.context
    supContext.tagJsVar.processUpdate(
      supContext.value as TemplateValue,
      supContext,
      newestSupport.ownerSupport as AnySupport, // ownerSupport,
      [],
    )
  }

  if(isPromise(maybePromise)) {
    (maybePromise as Promise<any>).finally(() => {
      if(context.global) {
        // renderSupport(newestSupport) // TODO: remove
      } else {
        const supContext = newestSupport.context
        supContext.tagJsVar.processUpdate(
          supContext.value as TemplateValue,
          supContext,
          newestSupport.ownerSupport as AnySupport, // ownerSupport,
          [],
        )
      }
    })
  }

  return maybePromise
}
