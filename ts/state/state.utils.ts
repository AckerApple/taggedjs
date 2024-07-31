import { BaseSupport, Support } from '../tag/Support.class.js'
import { firstLetState, reLetState } from './letState.function.js'
import { setUseMemory } from'./setUse.function.js'
// import { runFirstState } from './state.function.js'
import { stateHandlers } from './stateHandlers.js'

export type StateConfig<T> = (x: T) => [T, T]

export type StateConfigItem<T> = {
  get: () => T // TODO: only a convenience, not needed, remove
  callback?: StateConfig<T>
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value
}

export type Config = {
  support?: BaseSupport | Support
  array: State // state memory on the first render
  rearray?: State // state memory to be used before the next render
}

export type State = StateConfigItem<any>[]

setUseMemory.stateConfig = {
  array: [] as State, // state memory on the first render
  // rearray: [] as State,
} as Config

export type GetSet<T> = (y: T) => [T, T]

export function afterRender(
  support: Support | BaseSupport,
) {
  const config: Config = setUseMemory.stateConfig
  
  // TODO: only needed in development
  /*
  const rearray = config.rearray as unknown as State[]
  if(rearray.length && rearray.length !== config.array.length) {
    const message = `States lengths have changed ${rearray.length} !== ${config.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`
    const wrapper = support.templater?.wrapper as Wrapper
    const details = {
      oldStates: config.array,
      newStates: config.rearray,
      tagFunction: wrapper.parentWrap.original,
    }
    const error = new StateMismatchError(message,details)
    console.warn(message,details)
    throw error
  }
  */
  
  delete config.support

  support.state = config.array
  config.array = []
}

export function initState(
  support: Support | BaseSupport
) {
  // stateHandlers.handler = runFirstState
  stateHandlers.letHandler = firstLetState as any

  const config: Config = setUseMemory.stateConfig
  config.rearray = []
  config.support = support
}

export function reState(
  support: Support | BaseSupport
) {
  const state = support.state
  const config: Config = setUseMemory.stateConfig
  config.rearray = state
  const rearray = config.rearray as State
  
  if(rearray && rearray.length) {
    // stateHandlers.handler = reState as any
    stateHandlers.letHandler = reLetState as any
  } else {
    // stateHandlers.handler = runFirstState
    stateHandlers.letHandler = firstLetState
  }

  config.support = support
}

export class StateEchoBack {}

// sends a fake value and then sets back to received value
export function getCallbackValue<T>(
  callback: StateConfig<T>
): [T, T] {
  const oldState = callback(StateEchoBack as any) // get value and set to undefined
  const [value] = oldState
  
  const [checkValue] = callback( value ) // set back to original value
  return [value, checkValue]
}
