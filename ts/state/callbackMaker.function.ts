import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { setUseMemory } from './setUseMemory.object.js'
import { SyncCallbackError } from '../errors.js'
import { createTrigger } from './callback.function.js'

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

  const oldState = setUseMemory.stateConfig // .stateArray

  return function triggerMaker<A,B,C,D,E,F, T>(
    callback: Callback<A, B, C, D, E, F, T>
  ) {
    return createTrigger(support, oldState, callback)
  } as innerCallback
}

export const syncError = new SyncCallbackError('callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering')
