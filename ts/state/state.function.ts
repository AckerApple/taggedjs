import { TagSupport } from '../tag/TagSupport.class.js'
import { setUse } from './setUse.function.js'
import { Config, StateConfig, State, StateConfigItem, getStateValue } from './state.utils.js'
import { syncStates } from './syncStates.function.js'

/** Used for variables that need to remain the same variable during render passes */
export function state <T>(
  defaultValue: T | (() => T),
): T {
  const config: Config = setUse.memory.stateConfig
  let getSetMethod: StateConfig<T>
  const rearray = config.rearray as State

  const restate = rearray[config.array.length]
  if(restate) {
    let oldValue = getStateValue(restate) as T
    getSetMethod = ((x: T) => [oldValue, oldValue = x])
    const push: StateConfigItem<T> = {
      get: () => getStateValue(push) as T,
      callback: getSetMethod,
      lastValue: oldValue,
      defaultValue: restate.defaultValue,
    }

    config.array.push(push)

    return oldValue
  }

  // State first time run
  const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue
  let initValue = defaultFn()

  // the state is actually intended to be a function
  if(initValue instanceof Function) {
    const oldState = config.array
    const tagSupport = config.tagSupport as TagSupport
    const original = initValue
    
    initValue = ((...args: any[]) => {
      const global = tagSupport.global
      const newest = global.newest as TagSupport
      const newState = newest.memory.state
      
      syncStates(newState, oldState)

      const result = original(...args)
      
      syncStates(oldState, newState)
      
      return result
    }) as any

    ;(initValue as any).original = original
  }

  getSetMethod = ((x: T) => [initValue, initValue = x])
  const push: StateConfigItem<T> = {
    get: () => getStateValue(push) as T,
    callback: getSetMethod,
    lastValue: initValue,
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return initValue
}
