import { setUse } from './setUse.function.js'
import { Config, State, StateConfigItem, getStateValue } from './state.utils.js'

/** Used for variables that need to remain the same variable during render passes */
export function state <T>(
  defaultValue: T | (() => T),
): T {
  const config: Config = setUse.memory.stateConfig
  const rearray = config.rearray as State

  if(rearray.length && rearray.length >= config.array.length) {
    const restate = rearray[config.array.length]
    config.array.push(restate)
    return restate.defaultValue
  }

  // State first time run
  const defaultFn = defaultValue instanceof Function ? defaultValue : function() {
    return defaultValue
  }
  let initValue = defaultFn()

  // the state is actually intended to be a function
  if(initValue instanceof Function) {
    const original = initValue
    
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
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return initValue
}
