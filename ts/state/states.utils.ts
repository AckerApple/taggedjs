import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { AnySupport } from '../tag/Support.class.js'
import { StateMemory } from './StateMemory.type.js'

export type StatesSetter = (
  set: <T>(a: T) => T
) => any

export function firstStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig
  
  // State first time run
  config.states[config.statesIndex] = setter
  const support = config.support as AnySupport
  support.states[config.statesIndex] = setter

  ++config.statesIndex
  
  return setter(state)
}

export function reStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig
  const support = config.support as AnySupport
  
  const statesIndex = config.statesIndex
  const prevSupport = config.prevSupport
  const oldStates = prevSupport?.states[statesIndex] as StatesSetter
  const lastValues: any = []
  
  const regetter = <T>(value: T): T => {
    lastValues.push(value)
    return value
  }

  oldStates(regetter)

  let index = 0
  const resetter = <T>(value: T): T => {
    // state(value) // fake call and do not care about result
    // fake state() having been called
    config.stateArray.push({
      get: () => value,
      defaultValue: value,
    })

    const lastValue = lastValues[index]
    
    ++index
    
    return lastValue
  }

  support.states[config.statesIndex] = setter
  ++config.statesIndex

  return setter(resetter)
}
