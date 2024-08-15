import { firstLetState } from './letState.function.js'
import { setUseMemory } from './setUse.function.js'
import { Config, State, StateConfigItem } from './state.utils.js'
import { getStateValue } from './getStateValue.function.js'

export const stateHandlers = {
  handler: runFirstState,
  letHandler: firstLetState,
}


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
  
  if(defaultValue instanceof Function) {
    initValue = defaultValue()
  }

  // the state is actually intended to be a function
  if(initValue instanceof Function) {
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
