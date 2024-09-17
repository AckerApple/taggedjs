import { firstLetState, reLetState } from './letState.function.js'
import { BaseSupport, Support } from '../tag/Support.class.js'
import { runFirstState, runRestate } from './stateHandlers.js'
import { State, StateConfig } from './state.types.js'

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

export function initState(
  support: Support | BaseSupport,
  config: Config,
) {
  config.handlers.handler = runFirstState
  config.handlers.letHandler = firstLetState as <T>(defaultValue: T | (() => T)) => (y: unknown) => T
  
  config.rearray = []
  config.array = []
  config.support = support
}

export function reState(
  support: Support | BaseSupport,
  config: Config,
) {
  const state = support.state
  config.rearray = state
  config.array = []

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
