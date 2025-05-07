import callbackStateUpdate from './callbackStateUpdate.function.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { setUseMemory } from './setUseMemory.object.js'
import { Callback, syncError } from './callbackMaker.function.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { StateMemory } from './StateMemory.type.js'

/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback<A,B,C,D,E,F, T>(
  callback: Callback<A, B, C, D, E, F, T>
): (A?: A, B?: B, C?: C, D?: D, E?: E, F?: F) => T {
  const support = getSupportInCycle()

  if(!support) {
    throw syncError
  }

  return createTrigger(
    support,
    setUseMemory.stateConfig, // setUseMemory.stateConfig.stateArray
    callback,
  )
}

export function createTrigger<A,B,C,D,E,F, T>(
  support: AnySupport,
  oldState: StateMemory,
  toCallback: Callback<A, B, C, D, E, F, T>,
) {
  // const oldStates = [...oldState.states]
  const oldStates = oldState.states

  return function trigger(...args: any[]) {
    const callbackMaker = support.subject.renderCount > 0
    
    if(callbackMaker) {
      return callbackStateUpdate(
        support,
        oldStates,
        toCallback,
        ...args
      )
    }

    // we are in sync with rendering, just run callback naturally
    return (toCallback as any)(...args)
  }
}
