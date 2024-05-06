import { setUse } from './setUse.function'
import { Config, StateConfig, State, StateConfigItem, getStateValue } from './state.utils'

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
