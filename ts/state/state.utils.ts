import { firstLetState, reLetState } from './letState.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'
import { runFirstState, runRestate } from './stateHandlers.js'
import { State, StateConfig } from './state.types.js'
import { setUseMemory } from'./setUse.function.js'

export type Config = {
  version: number
  support?: BaseSupport | Support
  array: State // state memory on the first render
  rearray?: State // state memory to be used before the next render
  handlers: {
    handler: typeof runFirstState,
    letHandler: typeof firstLetState,
  }
}

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
  support: Support | BaseSupport,
  config: Config,
) {
  config.handlers.handler = runFirstState
  config.handlers.letHandler = firstLetState as any
  
  config.rearray = []
  config.support = support
}

export function reState(
  support: Support | BaseSupport,
  config: Config,
) {
  const state = support.state
  config.rearray = state

  config.handlers.handler = runRestate as any
  config.handlers.letHandler = reLetState as any
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
