import { AnySupport } from '../tag/Support.class.js'
import { renderSupport } from '../tag/render/renderSupport.function.js'
import { syncStates } from './syncStates.function.js'
import { Callback } from './callbackMaker.function.js'
import {SupportTagGlobal } from '../tag/index.js'
import { isPromise } from '../isInstance.js'
import { StatesSetter } from './states.utils.js'
import { State } from './state.types.js'

export default function callbackStateUpdate<T>(
  support: AnySupport,
  callback: Callback<any, any,any, any, any, any, T>,
  oldState: { stateArray: State, states: StatesSetter[] },// State,
  ...args: any[]
): T {
  const global = support.subject.global as SupportTagGlobal
  support = global.newest
  const state = support.state

  // ensure that the oldest has the latest values first
  syncStates(
    state,
    oldState.stateArray,
    support.states,
    oldState.states,
  )
  
  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  // send the oldest state changes into the newest
  syncStates(
    oldState.stateArray,
    state,
    oldState.states,
    support.states,
  )
  renderSupport(support)

  if(isPromise(maybePromise)) {
    (maybePromise as Promise<any>).finally(() => {
      // send the oldest state changes into the newest
      syncStates(
        oldState.stateArray,
        state,
        oldState.states,
        support.states,
      )

      renderSupport(support)
    })
  }

  // return undefined as T
  return maybePromise
}
