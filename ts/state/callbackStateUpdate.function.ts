import { AnySupport } from '../tag/getSupport.function.js'
import { renderSupport } from '../tag/render/renderSupport.function.js'
import { syncSupports } from './syncStates.function.js'
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
  const newestSupport = global.newest
  // const state = newestSupport.state

  // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
  syncSupports(newestSupport, support)
  /*
  syncStates(
    state, // stateFrom
    oldState.stateArray, // stateTo
    newestSupport.states, // intoStates
    oldState.states, // statesFrom
  )
  */

  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  // OLDEST UPDATE NEWEST: send the oldest state changes into the newest
  syncSupports(support, newestSupport)
  /*
  syncStates(
    oldState.stateArray, // stateFrom
    state, // stateTo
    oldState.states, // intoStates
    newestSupport.states, // statesFrom
  )
  */

  renderSupport(newestSupport)

  if(isPromise(maybePromise)) {
    (maybePromise as Promise<any>).finally(() => {
      // send the oldest state changes into the newest
      syncSupports(support, newestSupport)
      /*
      syncStates(
        oldState.stateArray,
        state,
        oldState.states,
        newestSupport.states,
      )
      */

      renderSupport(newestSupport)
    })
  }

  // return undefined as T
  return maybePromise
}
