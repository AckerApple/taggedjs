import { BaseTagSupport, TagSupport } from "../tag/TagSupport.class"
import { setUse } from "./setUse.function"
import { State } from "./state.utils"
import { renderTagSupport } from "../tag/render/renderTagSupport.function"
import { SyncCallbackError } from "../errors"
import { syncStates } from "./syncStates.function"
import { getSupportInCycle } from "../tag/getSupportInCycle.function"

type Callback<A,B,C,D,E,F, T> = (
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
  beforeRender: (tagSupport: BaseTagSupport) => initMemory(tagSupport),
  beforeRedraw: (tagSupport: BaseTagSupport) => initMemory(tagSupport),
  afterRender: (tagSupport: BaseTagSupport) => {
    ;(tagSupport.global as any).callbackMaker = true
    innerCallback = originalGetter // prevent crossing callbacks with another tag
  },
})

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
      return triggerStateUpdate(tagSupport, callback, oldState, ...args)
    }

    return (callback as any)(...args)
  }

  return trigger
}

function initMemory (tagSupport: BaseTagSupport) {
  const oldState: State = setUse.memory.stateConfig.array
  innerCallback = (
    callback: Callback<any, any, any, any, any, any, any>
  ) => {    
    const trigger = (...args: any[]) => {
      const callbackMaker = (tagSupport.global as any).callbackMaker
      
      if(callbackMaker) {
        return triggerStateUpdate(tagSupport, callback, oldState, ...args)
      }

      return (callback as any)(...args)
    }

    return trigger
  }
}

function triggerStateUpdate<T>(
  tagSupport: BaseTagSupport,
  callback: Callback<any, any,any, any, any, any, T>,
  oldState: State,
  ...args: any[]
): T {
  const state = tagSupport.memory.state  

  // ensure that the oldest has the latest values first
  syncStates(state, oldState)
  
  // run the callback
  const maybePromise = callback(...args as [any,any,any,any,any,any])

  // send the oldest state changes into the newest
  syncStates(oldState, state)
  
  /*
  if(tagSupport.global.deleted) {
    return maybePromise // While running callback the tag was deleted. Often that happens
  }
  */

  renderTagSupport(
    tagSupport as TagSupport,
    false,
  )

  if(maybePromise instanceof Promise) {
    maybePromise.finally(() => {
      // send the oldest state changes into the newest
      syncStates(oldState, state)

      renderTagSupport(
        tagSupport as TagSupport,
        false,
      )
    })
  }

  // return undefined as T
  return maybePromise
}
