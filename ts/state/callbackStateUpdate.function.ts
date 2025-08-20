import { AnySupport, SupportContextItem } from '../index.js'
import { renderSupport } from '../render/renderSupport.function.js'
import { Callback } from './callbackMaker.function.js'
import { isPromise } from '../isInstance.js'
import { StatesSetter } from './states.utils.js'
import { findStateSupportUpContext, getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'

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
    renderSupport(newestSupport)
  
    if(isPromise(maybePromise)) {
      (maybePromise as Promise<any>).finally(() => {
        renderSupport(newestSupport)
      })
    }
  }

  return maybePromise
}
