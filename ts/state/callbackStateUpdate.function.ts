import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { State } from './state.utils.js'
import { renderTagSupport } from '../tag/render/renderTagSupport.function.js'
import { syncStates } from './syncStates.function.js'
import { Callback } from './callbackMaker.function.js'

export default function callbackStateUpdate<T>(
  tagSupport: TagSupport | BaseTagSupport,
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

  renderTagSupport(
    tagSupport,
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
