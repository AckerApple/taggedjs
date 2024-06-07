import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { setUse } from './setUse.function.js'
import { State } from './state.utils.js'
import { SyncCallbackError } from '../errors.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import callbackStateUpdate from './callbackStateUpdate.function.js'

export type Callback<A,B,C,D,E,F, T> = (
  a: A, b: B, c: C, d: D, e: E, f: F,
) => T


let innerCallback = <A,B,C,D,E,F, T>(
  callback: Callback<A,B,C,D,E,F,T>
) => (a?:A, b?:B, c?:C, d?:D, e?:E, f?:F): T => {
  throw new SyncCallbackError('Callback function was called immediately in sync and must instead be call async')
}
export const callbackMaker = () => innerCallback

const originalGetter = innerCallback // callbackMaker

setUse({
  beforeRender: tagSupport => initMemory(tagSupport),
  beforeRedraw: tagSupport => initMemory(tagSupport),
  afterRender: tagSupport => {
    ;(tagSupport.global as any).callbackMaker = true
    innerCallback = originalGetter // prevent crossing callbacks with another tag
  },
})

/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback<A,B,C,D,E,F, T>(
  callback: Callback<A, B, C, D, E, F, T>
): () => T {
  const tagSupport = getSupportInCycle()

  if(!tagSupport) {
    const error = new SyncCallbackError('callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering')
    throw error
  }

  const oldState = setUse.memory.stateConfig.array
  const trigger = (...args: any[]) => {
    const callbackMaker = (tagSupport.global as any).callbackMaker
    
    if(callbackMaker) {
      return callbackStateUpdate(tagSupport, callback, oldState, ...args)
    }

    return (callback as any)(...args)
  }

  return trigger
}

function initMemory (tagSupport: TagSupport | BaseTagSupport) {
  const oldState: State = setUse.memory.stateConfig.array
  innerCallback = (
    callback: Callback<any, any, any, any, any, any, any>
  ) => {    
    const trigger = (...args: any[]) => {
      const callbackMaker = (tagSupport.global as any).callbackMaker
      
      if(callbackMaker) {
        return callbackStateUpdate(tagSupport, callback, oldState, ...args)
      }

      return (callback as any)(...args)
    }

    return trigger
  }
}
