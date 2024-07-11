import { Config, GetSet, StateConfig, State, StateConfigItem, getStateValue } from './state.utils.js'
import { setUse } from './setUse.function.js'
import { Support } from '../tag/Support.class.js'

/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function letState <T>(
  defaultValue: T | (() => T),
): ((getSet: GetSet<T>) => T) {
  const config: Config = setUse.memory.stateConfig
  const rearray = config.rearray as State
  
  if(rearray.length) {
    const restate = rearray[config.array.length]
    let oldValue = getStateValue(restate) as T

    const push: StateConfigItem<T> = {
      get: () => getStateValue(push) as T,
      defaultValue: restate.defaultValue,
    }

    config.array.push(push)

    return makeStateResult(oldValue, push)
  }

  // State first time run
  const initValue = defaultValue instanceof Function ? defaultValue() : defaultValue
  const push: StateConfigItem<T> = {
    get: () => getStateValue(push) as T,
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return makeStateResult(initValue, push)
}

function makeStateResult<T>(
  initValue: T,
  push: StateConfigItem<T>,
) {
  const result = (y: any) => {
    push.callback = y // || (x => [initValue, initValue = x])
    return initValue
  }

  return result
}
