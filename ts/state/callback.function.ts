import callbackStateUpdate from './callbackStateUpdate.function.js'
import { AnySupport } from '../tag/index.js'
import { setUseMemory } from './setUseMemory.object.js'
import { Callback } from './callbackMaker.function.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { StateMemory } from './StateMemory.type.js'
import { state } from './state.function.js'

/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback<A,B,C,D,E,F, T>(
  callback: Callback<A, B, C, D, E, F, T>
): (A?: A, B?: B, C?: C, D?: D, E?: E, F?: F) => T {
  const support = getSupportInCycle() as AnySupport
  
  const callbackState = state({
    callback,
  })

  // ensure only one trigger instance created and always returned
  const callbackTrigger = state(() => createTrigger(
    support,
    setUseMemory.stateConfig, // setUseMemory.stateConfig.stateArray
    callbackState,
  ))

  // always update callback to latest in cycle
  callbackState.callback = callback

  return callbackTrigger
}

type CallbackState = {
  callback: any
}

export function createTrigger(
  support: AnySupport,
  oldState: StateMemory,
  callbackState: CallbackState,
) {
  const oldStates = oldState.states

  return function trigger(...args: any[]) {
    const callbackMaker = support.context.renderCount > 0
    
    if(callbackMaker) {
      return callbackStateUpdate(
        support,
        oldStates,
        callbackState.callback,
        ...args
      )
    }

    // we are in sync with rendering, just run callback naturally
    return (callbackState.callback as any)(...args)
  }
}
