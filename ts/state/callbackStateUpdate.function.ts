import { AnySupport } from '../tag/AnySupport.type.js'
import { renderSupport } from '../render/renderSupport.function.js'
import { Callback } from './callbackMaker.function.js'
import { SupportTagGlobal } from '../tag/index.js'
import { isPromise } from '../isInstance.js'
import { StatesSetter } from './states.utils.js'

export default function callbackStateUpdate<T>(
  support: AnySupport,
  oldStates: StatesSetter[],
  callback: Callback<any, any,any, any, any, any, T>,
  ...args: any[]
): T {
  const global = support.context.global as SupportTagGlobal
  const newestSupport = support.context.state.newest as AnySupport

  // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
  //syncStatesArray(newestSupport.states, oldStates)

  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  renderSupport(newestSupport)

  if(isPromise(maybePromise)) {
    (maybePromise as Promise<any>).finally(() => {
      renderSupport(newestSupport)
    })
  }

  // return undefined as T
  return maybePromise
}
