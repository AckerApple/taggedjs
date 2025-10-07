import { SupportContextItem } from '../index.js'
import { renderSupport } from '../render/renderSupport.function.js'
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
  // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
  //syncStatesArray(newestSupport.states, oldStates)

  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  const newestSupport = findStateSupportUpContext(context)
  // const newestSupport = context.state.newest as AnySupport
  if(newestSupport) {
    // context.global && 
    if(newestSupport.context.global) {
      renderSupport(newestSupport) // TODO: remove
    } else {
      context.tagJsVar.processUpdate(
        context.value,
        context,
        newestSupport, // ownerSupport,
        [],
      )
    }

    if(isPromise(maybePromise)) {
      (maybePromise as Promise<any>).finally(() => {
        if(context.global) {
          renderSupport(newestSupport) // TODO: remove
        } else {
          context.tagJsVar.processUpdate(
            context.value,
            context,
            newestSupport, // ownerSupport,
            [],
          )
        }
      })
    }
  }

  return maybePromise
}
