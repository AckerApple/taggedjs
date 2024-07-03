import { Config, GetSet, StateConfig, State, StateConfigItem, getStateValue } from './state.utils.js'
import { setUse } from './setUse.function.js'

/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function letState <T>(
  defaultValue: T | (() => T),
): ((getSet: GetSet<T>) => T) {
  const config: Config = setUse.memory.stateConfig
  const rearray = config.rearray as State
  const restate = rearray[config.array.length]
  
  if(restate) {
    let oldValue = getStateValue(restate) as T

    const getSetMethod: StateConfig<T> = ((x: T) => [oldValue, oldValue = x])
    
    const push: StateConfigItem<T> = {
      get: () => getStateValue(push) as T,
      callback: getSetMethod,
      // lastValue: oldValue,
      defaultValue: restate.defaultValue,
    }

    config.array.push(push)

    return makeStateResult(oldValue, push)
  }

  // State first time run
  const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue
  let initValue = defaultFn()

  const getSetMethod: StateConfig<T> = ((x: T) => [initValue, initValue = x])
  const push: StateConfigItem<T> = {
    get: () => getStateValue(push) as T,
    callback: getSetMethod,
    // lastValue: initValue,
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return makeStateResult(initValue, push)
}

function makeStateResult<T>(
  initValue: T,
  push: StateConfigItem<T>,
) {
  // return initValue
  const result =  (y: any) => {
    push.callback = y || (x => [initValue, initValue = x])

    return initValue
  }

  return result
}
