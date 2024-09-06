import { firstLetState } from './letState.function.js'
import { setUseMemory } from './setUse.function.js'
import { State, StateConfigItem } from './state.types.js'
import { Config } from './state.utils.js'
import { getStateValue } from './getStateValue.function.js'
import { BasicTypes } from '../tag/ValueTypes.enum.js'

export function runRestate <T>() {
  const config: Config = setUseMemory.stateConfig
  const rearray = config.rearray as State

  const restate = rearray[config.array.length]
  config.array.push(restate)
  return restate.defaultValue
}

export function runFirstState <T>(
  defaultValue: T | (() => T),
) {
  const config: Config = setUseMemory.stateConfig

  // State first time run
  let initValue = defaultValue
  
  if(typeof(defaultValue) === BasicTypes.function) {
    initValue = (defaultValue as Function)()
  }

  // the state is actually intended to be a function
  if(typeof(initValue) === BasicTypes.function) {
    const original = initValue as Function
    
    initValue = function initValueFun(...args: any[]) {
      const result = original(...args)
      return result
    } as any

    ;(initValue as any).original = original
  }

  const push: StateConfigItem<T> = {
    get: function pushState() {
      return getStateValue(push) as T
    },
    defaultValue: initValue as T,
  }
  config.array.push(push)
  
  return initValue as T
}
