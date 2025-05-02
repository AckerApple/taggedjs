import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { AnySupport } from '../tag/getSupport.function.js'
import { StateMemory } from './StateMemory.type.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'

export type StateSet = <T extends any[]>(...a: [...T]) => [...T]

export type StatesSetter = (
  set: StateSet,
  syncDirection?: number
) => any

export function firstStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig

  // State first time run
  config.states[config.statesIndex] = setter
  // const support = config.support as AnySupport
  // support.states[config.statesIndex] = setter

  ++config.statesIndex
  
  return setter(<T extends any[]>(...args: [...T]) => {
    // state(args)
    return args
  })
}

/** aka statesHandler */
export function reStatesHandler(
  setter: StatesSetter
) {
  const config: StateMemory = setUseMemory.stateConfig
  const support = config.support as AnySupport    
  const statesIndex = config.statesIndex
  const prevSupport = getSupportWithState(config.prevSupport as AnySupport)
  
  const prevStates = prevSupport.states as StatesSetter[]
  // const prevStates = config.states
  
  const oldStates = prevStates[statesIndex]
  let lastValues: any[] = []
  
  oldStates(function regetter(...args) {
    lastValues = args
    return args
  })

  let index = 0
  const resetter = <T extends any[]>(..._args: [...T]): T => {
    // state(value) // fake call and do not care about result
    // fake state() having been called
    /*
    config.stateArray.push({
      get: () => args,
      defaultValue: args,
    })
    */
    // const lastValue = lastValues[index]
    /*
    let lastValue: any
    oldStates((...x) => {
      return lastValue = x
    })
*/    
    ++index

    return lastValues as T
  }

  //;(config.support as AnySupport).states[config.statesIndex] = setter
  config.states[config.statesIndex] = setter
  ++config.statesIndex

  return setter(resetter)
}
