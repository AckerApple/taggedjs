import { TagSupport } from "./TagSupport.class.js"
import { setUse } from "./setUse.function.js"
import { State, StateConfigArray, getStateValue } from "./set.function.js"

type Callback = <T>(...args: unknown[]) => (T | void)

export let getCallback = () => (callback: Callback) => (): void => {
  throw new Error('The real callback function was called and that should never occur')
}

setUse({
  beforeRender: (tagSupport: TagSupport) => initMemory(tagSupport),
  beforeRedraw: (tagSupport: TagSupport) => initMemory(tagSupport),
  // afterRender: (tagSupport: TagSupport) => {},
})

function updateState(
  stateFrom: StateConfigArray,
  stateTo: StateConfigArray,
) {
  stateFrom.forEach((state, index) => {
    const fromValue = getStateValue(state)
    const callback = stateTo[index].callback
    
    if(callback) {
      callback( fromValue ) // set the value
    }
    
    stateTo[index].lastValue = fromValue // record the value
  })
}

type Trigger = () => void
type CallbackMaker = (callback: Callback) => Trigger

function initMemory (tagSupport: TagSupport) {
  getCallback = () => {
    const oldState: StateConfigArray = setUse.memory.stateConfig.array

    const callbackMaker: CallbackMaker = (
      callback: Callback
    ) => {
      const trigger = (...args: any[]) => triggerStateUpdate(tagSupport, callback, oldState, ...args)
      return trigger
    }

    return callbackMaker
  }
}

function triggerStateUpdate(
  tagSupport: TagSupport,
  callback: Callback,
  oldState: StateConfigArray,
  ...args: any[]
) {
  const state = tagSupport.memory.state as State
  const newest = state.newest

  // ensure that the oldest has the latest values first
  updateState(newest, oldState)
  
  // run the callback
  const promise = callback(...args)

  // send the oldest state changes into the newest
  updateState(oldState, newest)
  
  tagSupport.render()        
  
  // TODO: turn back on below
  if(promise instanceof Promise) {
    promise.finally(() => {
      // send the oldest state changes into the newest
      updateState(oldState, newest)

      tagSupport.render()    
    })
  }
}