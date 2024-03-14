import { Config, GetSet, StateConfig, StateConfigItem, getStateValue, makeStateResult } from './set.function'
import { setUse } from './setUse.function'

/** Used for variables that need to remain the same variable during render passes */
export function setLet <T>(
  defaultValue: T | (() => T),
): ((getSet: GetSet<T>) => T) {
  const config: Config = setUse.memory.stateConfig
  let getSetMethod: StateConfig<T>
  
  const restate = config.rearray[config.array.length]
  if(restate) {
    let oldValue = getStateValue(restate) as T

    getSetMethod = ((x: T) => [oldValue, oldValue = x])
    const push: StateConfigItem<T> = {
      callback: getSetMethod,
      lastValue: oldValue,
      defaultValue: restate.defaultValue,
    }

    config.array.push(push)

    return makeStateResult(oldValue, push)
  }

  // State first time run
  const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue
  let initValue = defaultFn()

  getSetMethod = ((x: T) => [initValue, initValue = x])
  const push: StateConfigItem<T> = {
    callback: getSetMethod,
    lastValue: initValue,
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return makeStateResult(initValue, push)
}
