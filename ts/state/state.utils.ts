import { AnySupport, ContextItem } from '../tag/index.js'
import { runFirstState, runRestate } from './stateHandlers.js'
import { State, StateConfig } from './state.types.js'
import { firstStatesHandler, reStatesHandler } from './states.utils.js'
import { setUseMemory } from './setUseMemory.object.js'
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { setContextInCycle } from '../tag/cycles/setContextInCycle.function.js'

/** To be called before rendering anything with a state */
export function initState(
  context: ContextItem,
) {
  setContextInCycle(context)
  
  const config = setUseMemory.stateConfig
  config.handlers.handler = runFirstState
  config.handlers.statesHandler = firstStatesHandler as <T>(defaultValue: T | (() => T)) => (y: unknown) => T
  
  config.rearray = []
  const state = config.state = []
  const states = config.states = []
  config.statesIndex = 0

  const stateMeta = context.state = context.state || {}
  stateMeta.newer = { state, states }
}

export function reState(
  prevState: State,
) {
  const config = setUseMemory.stateConfig

  // set previous state memory
  config.rearray = prevState

  config.state = []
  config.states = []
  config.statesIndex = 0
  
  config.handlers.handler = runRestate
  config.handlers.statesHandler = reStatesHandler

  return config
}

export function reStateSupport(
  newSupport: AnySupport,
  prevSupport: AnySupport,
  prevState: State,
) {  
  reState(prevState)
  
  const config = setUseMemory.stateConfig
  config.prevSupport = prevSupport

  setSupportInCycle(newSupport)
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
