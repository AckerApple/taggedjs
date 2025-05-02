import { AnySupport } from '../tag/getSupport.function.js'
import { runFirstState, runRestate } from './stateHandlers.js'
import { State, StateConfig } from './state.types.js'
import { firstStatesHandler, reStatesHandler, StatesSetter } from './states.utils.js'
import { StateMemory } from './StateMemory.type.js'

export function initState(
  support: AnySupport,
  config: StateMemory,
) {
  config.handlers.handler = runFirstState
  config.handlers.statesHandler = firstStatesHandler as <T>(defaultValue: T | (() => T)) => (y: unknown) => T
  
  config.rearray = []
  config.stateArray = []
  config.states = []
  config.statesIndex = 0
  config.support = support
}

export function reState(
  newSupport: AnySupport,
  prevSupport: AnySupport,
  config: StateMemory,
  prevState: State,
  prevStates: StatesSetter[],
) {
  // set previous state memory
  config.rearray = prevState

  config.stateArray = []
  config.states = []
  //config.states = prevStates
  //config.states = [...prevStates]
  // newSupport.states = [...prevStates]
  // support.states = config.states
  config.statesIndex = 0
  
  config.handlers.handler = runRestate
  config.handlers.statesHandler = reStatesHandler
  
  // config.support = support
  config.prevSupport = prevSupport
}

export class StateEchoBack {}

/** sends a fake value and then sets back to received value */
export function getCallbackValue<T>(
  callback: StateConfig<T>
): [T, T] {
  const [ value ] = callback(StateEchoBack as any) // get value and set to undefined
  const [checkValue] = callback( value ) // set back to original value
  return [value, checkValue]
}
