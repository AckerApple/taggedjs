import { BaseTagSupport } from "./TagSupport.class"
import { setUse } from "./setUse.function"
import { State, StateConfigArray, getStateValue } from "./set.function"
import { renderTagSupport } from "./renderTagSupport.function"

type Callback = <T>(...args: unknown[]) => (T | void)

let innerCallback = (callback: Callback) => (): void => {
  throw new Error('The real callback function was called and that should never occur')
}
export const getCallback = () => innerCallback

const originalGetter = innerCallback // getCallback

setUse({
  beforeRender: (tagSupport: BaseTagSupport) => initMemory(tagSupport),
  beforeRedraw: (tagSupport: BaseTagSupport) => initMemory(tagSupport),
  afterRender: (_tagSupport: BaseTagSupport) => {
    innerCallback = originalGetter // prevent crossing callbacks with another tag
  },
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

function initMemory (tagSupport: BaseTagSupport) {
  const oldState: StateConfigArray = setUse.memory.stateConfig.array
  innerCallback = (
    callback: Callback
  ) => {
    const trigger = (...args: any[]) => triggerStateUpdate(tagSupport, callback, oldState, ...args)
    return trigger
  }
}

function triggerStateUpdate(
  tagSupport: BaseTagSupport,
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
  
  renderTagSupport(
    tagSupport,
    false,
  )

  // TODO: turn back on below
  if(promise instanceof Promise) {
    promise.finally(() => {
      // send the oldest state changes into the newest
      updateState(oldState, newest)

      renderTagSupport(
        tagSupport,
        false,
      )
    })
  }
}