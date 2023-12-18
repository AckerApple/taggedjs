import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport.js"
import { State, StateConfig, StateConfigArray, StateTagSupport, getStateValue } from "./state.js"
import { setUse } from "./tagRunner.js"

type Callback = <T>(...args: unknown[]) => T

export let getCallback = () => (callback: Callback) => (): void => {
  throw new Error('The real callback function was called and that should never occur')
}

type CallbackTagSupport = StateTagSupport & {
  getCallback?: Callback
  callbacks?: any[]
}

setUse({
  beforeRender: (tagSupport: CallbackTagSupport) => {
    tagSupport.callbacks = []

    getCallback = () => {
      
      const callbackMaker = (
        callback: Callback
      ) => {
        const trigger = () => {
          const state = tagSupport.state as State
          const oldest = (callbackMaker as any).state // state.oldest as StateConfigArray
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

        const state = tagSupport.state as State
        trigger.state = state

        return trigger
      }

      const callbacks = tagSupport.callbacks as any[]
      callbacks.push(callbackMaker)

      return callbackMaker
    }
  },
  afterRender: (tagSupport: CallbackTagSupport) => {
    const callbacks = tagSupport.callbacks as any[]
    callbacks.forEach(callback => {
      const state = tagSupport.state as State
      callback.state = [...state.newest as any]
    })
  }
})

function updateState(
  stateFrom: StateConfigArray,
  stateTo: StateConfigArray,
) {
  stateFrom.forEach((state, index) => {
    const oldValue = getStateValue(state)
    const [checkValue] = stateTo[index]( oldValue )
  })
}
