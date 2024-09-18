import callbackStateUpdate from './callbackStateUpdate.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { setUseMemory } from './setUse.function.js'
import { State } from './state.types.js'
import { Callback, syncError } from './callbackMaker.function.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'

/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback<A,B,C,D,E,F, T>(
  callback: Callback<A, B, C, D, E, F, T>
): (A?: A, B?: B, C?: C, D?: D, E?: E, F?: F) => T {
  const support = getSupportInCycle()

  if(!support) {
    throw syncError
  }

  return createTrigger(support, setUseMemory.stateConfig.array, callback)
}

export function createTrigger<A,B,C,D,E,F, T>(
  support: AnySupport,
  oldState: State,
  toCallback: Callback<A, B, C, D, E, F, T>,
) {
  return function trigger(...args: any[]) {
    const callbackMaker = support.subject.renderCount > 0

    if(callbackMaker) {
      return callbackStateUpdate(support, toCallback, oldState, ...args)
    }

    // we are in sync with rendering, just run callback naturally
    return (toCallback as any)(...args)
  }
}
