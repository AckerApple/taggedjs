import { BaseSupport, Support } from '../tag/Support.class.js'
import { State } from './state.utils.js'
import { renderSupport } from '../tag/render/renderSupport.function.js'
import { syncStates } from './syncStates.function.js'
import { Callback } from './callbackMaker.function.js'

export default function callbackStateUpdate<T>(
  support: Support | BaseSupport,
  callback: Callback<any, any,any, any, any, any, T>,
  oldState: State,
  ...args: any[]
): T {
  const state = support.state  
  // ensure that the oldest has the latest values first
  // ??? new removed
  // syncStates(state, oldState)
  
  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  // send the oldest state changes into the newest
  // ??? new removed
  // syncStates(oldState, state)
  renderSupport(
    support, // support.global.newest as Support,
    false,
  )

  if(maybePromise instanceof Promise) {
    maybePromise.finally(() => {
      // send the oldest state changes into the newest
      // ??? new removed
      // syncStates(oldState, state)

      renderSupport(
        support, // support.global.newest as Support,
        false,
      )
    })
  }

  // return undefined as T
  return maybePromise
}
