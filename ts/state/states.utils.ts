import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { AnySupport } from '../tag/getSupport.function.js'
import { StateMemory } from './StateMemory.type.js'

export type StateSet = <T extends any[]>(...a: [...T]) => [...T]

export type StatesSetter = (
  set: StateSet
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
  
  return setter(<T extends any[]>(...args: [...T]) => {
    state(args)
    return args
  })
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
  
  const regetter = <T extends any[]>(...args: [...T]) => {
    lastValues.push(args)
    return args
  }

  oldStates(regetter)

  let index = 0
  const resetter = (...args: any[]) => {
    // state(value) // fake call and do not care about result
    // fake state() having been called
    config.stateArray.push({
      get: () => args,
      defaultValue: args,
    })

    const lastValue = lastValues[index]
    
    ++index

    return lastValue
  }

  support.states[config.statesIndex] = setter
  ++config.statesIndex

  return setter(resetter)
}
