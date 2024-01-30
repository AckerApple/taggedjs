import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./setUse.function.js"
import { State, StateConfigArray, getStateValue } from "./state.js"

type Callback = <T>(...args: unknown[]) => T

export let getCallback = () => (callback: Callback) => (): void => {
  throw new Error('The real callback function was called and that should never occur')
}

setUse({
  beforeRender: (tagSupport: TagSupport) => {
    tagSupport.memory.callbacks = []

    getCallback = () => {
      const callbackMaker = (
        callback: Callback
      ) => {
        const trigger = () => {
          const state = tagSupport.memory.state as State
          const oldest = (callbackMaker as any).state
          const newest = state.newest
    
          // ensure that the oldest has the latest values first
          updateState(newest, oldest)
    
          // run the callback
          const promise = callback()
    
          // send the oldest state changes into the newest
          updateState(oldest, newest)
    
          tagSupport.render()
          
          if(promise instanceof Promise) {
            promise.finally(() => {
              // send the oldest state changes into the newest
              updateState(oldest, newest)
    
              tagSupport.render()    
            })
          }
        }

        const state = tagSupport.memory.state as State
        trigger.state = state

        return trigger
      }

      const callbacks = tagSupport.memory.callbacks as any[]
      callbacks.push(callbackMaker)

      return callbackMaker
    }
  },
  afterRender: (tagSupport: TagSupport) => {
    const callbacks = tagSupport.memory.callbacks as any[]
    callbacks.forEach(callback => {
      const state = tagSupport.memory.state as State
      callback.state = [...state.newest as any]
    })
  },
  afterTagClone(_oldTag, newTag) {
    // do not transfer callbacks
    newTag.tagSupport.memory.callbacks = []
  },
})

function updateState(
  stateFrom: StateConfigArray,
  stateTo: StateConfigArray,
) {
  stateFrom.forEach((state, index) => {
    const oldValue = getStateValue(state.callback)
    // const [checkValue] = stateTo[index].callback( oldValue )
    stateTo[index].callback( oldValue )
    stateTo[index].lastValue = oldValue
  })
}
