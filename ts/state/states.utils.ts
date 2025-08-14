import { setUseMemory } from './setUseMemory.object.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { ContextStateMeta, ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { StateMemory } from './StateMemory.type.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'

export type StateSet = <T extends any[]>(...a: [...T]) => [...T]

function returnArgs<T extends any[]>(...args: [...T]) {
  return args
}

export type StatesSetter = (
  set: StateSet,
  syncDirection?: number
) => any

export function firstStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig
  config.states[config.statesIndex] = setter

  ++config.statesIndex
  
  return setter(returnArgs)
}

/** aka statesHandler */
export function reStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig
  const statesIndex = config.statesIndex
  const prevSupport = getSupportWithState(config.prevSupport as AnySupport)
  const prevContext = prevSupport.context
  const stateMeta = prevContext.state as ContextStateMeta
  // const prevStateMeta = stateMeta.older as ContextStateSupport
  const prevStateMeta = stateMeta.newer as ContextStateSupport
  const prevStates = prevStateMeta.states
  // const prevStates = config.states
  
  const oldStates = prevStates[statesIndex]
  let lastValues: any[] = []

  oldStates(function regetter(...args) {
    lastValues = args
    return args
  })

  const resetter = function stateResetter<T extends any[]>(..._args: [...T]): T {
    return lastValues as T
  }

  config.states[config.statesIndex] = setter
  ++config.statesIndex

  return setter(resetter)
}
