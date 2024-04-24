import { BaseTagSupport, TagSupport } from "../TagSupport.class"
import { setUse } from "./setUse.function"
import { State, StateConfigArray, getStateValue } from "./state.utils"
import { renderTagSupport } from "../renderTagSupport.function"
import { SyncCallbackError } from "../errors"
import { Subject } from "../subject"
/*
const test = () => {
  const callback = callbackMaker()

  testCallback(callback(x => {
  }))

  new Subject(0).subscribe(callback(x => {
  }))
}

function testCallback(
  a: (a: number) => any
) {
  return a
}
*/
type Callback<A,B,C,D,E,F> = <T>(
  a: A, b: B, c: C, d: D, e: E, f: F,
) => (T | void)


let innerCallback = <A,B,C,D,E,F>(
  callback: Callback<A,B,C,D,E,F>
) => (a?:A, b?:B, c?:C, d?:D, e?:E, f?:F): void => {
  throw new SyncCallbackError('Callback function was called immediately in sync and must instead be call async')
}
export const callbackMaker = () => innerCallback

const originalGetter = innerCallback // callbackMaker

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

function initMemory (tagSupport: BaseTagSupport) {
  const oldState: StateConfigArray = setUse.memory.stateConfig.array
  innerCallback = (
    callback: Callback<any, any, any, any, any, any>
  ) => {
    const trigger = (...args: any[]) => triggerStateUpdate(tagSupport, callback, oldState, ...args)
    return trigger
  }
}

function triggerStateUpdate(
  tagSupport: BaseTagSupport,
  callback: Callback<any, any,any, any, any, any>,
  oldState: StateConfigArray,
  ...args: any[]
) {
  const state = tagSupport.memory.state as State

  // ensure that the oldest has the latest values first
  updateState(state, oldState)
  
  // run the callback
  const promise = callback(...args as [any,any,any,any,any,any])

  // send the oldest state changes into the newest
  updateState(oldState, state)
  
  renderTagSupport(
    tagSupport as TagSupport,
    false,
  )

  if(promise instanceof Promise) {
    promise.finally(() => {
      // send the oldest state changes into the newest
      updateState(oldState, state)

      renderTagSupport(
        tagSupport as TagSupport,
        false,
      )
    })
  }
}