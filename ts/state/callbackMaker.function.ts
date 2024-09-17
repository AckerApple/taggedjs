import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import callbackStateUpdate from './callbackStateUpdate.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { setUseMemory } from './setUse.function.js'
import { SyncCallbackError } from '../errors.js'
import { State } from './state.types.js'

export type Callback<A,B,C,D,E,F, T> = (
  a: A, b: B, c: C, d: D, e: E, f: F,
) => T


type innerCallback = <A,B,C,D,E,F, T>(
  _callback: Callback<A,B,C,D,E,F,T>
) => (_a?:A, _b?:B, _c?:C, _d?:D, _e?:E, _f?: F) => T

export const callbackMaker = () => {
  const support = getSupportInCycle()
  // callback as typeof innerCallback

  if(!support) {
    throw syncError
  }

  const oldState = setUseMemory.stateConfig.array
  return function triggerMaker<A,B,C,D,E,F, T>(
    callback: Callback<A, B, C, D, E, F, T>
  ) {
    return createTrigger(support, oldState, callback)
  } as innerCallback
}

const syncError = new SyncCallbackError('callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering')

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

function createTrigger<A,B,C,D,E,F, T>(
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
