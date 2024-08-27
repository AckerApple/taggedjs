import { BaseSupport, Support } from '../tag/Support.class.js'
import { State } from './state.utils.js'
import { renderSupport } from '../tag/render/renderSupport.function.js'
import { syncStates } from './syncStates.function.js'
import { Callback } from './callbackMaker.function.js'
import { SupportTagGlobal } from '../tag/index.js'
import { isPromise } from '../isInstance.js'

export default function callbackStateUpdate<T>(
  support: Support | BaseSupport,
  callback: Callback<any, any,any, any, any, any, T>,
  oldState: State,
  ...args: any[]
): T {
  const global = support.subject.global as SupportTagGlobal
  support = global.newest // || support
  const state = support.state
  // ensure that the oldest has the latest values first
  syncStates(state, oldState)
  
  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  // send the oldest state changes into the newest
  syncStates(oldState, state)
  renderSupport(support)

  if(isPromise(maybePromise)) {
    (maybePromise as Promise<any>).finally(() => {
      // send the oldest state changes into the newest
      syncStates(oldState, state)

      renderSupport(support)
    })
  }

  // return undefined as T
  return maybePromise
}
