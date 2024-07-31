import { Config, GetSet, State, StateConfigItem } from './state.utils.js'
import { setUseMemory } from './setUse.function.js'
import { getStateValue } from './getStateValue.function.js'
import { stateHandlers } from './stateHandlers.js'

/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function letState <T>(
  defaultValue: T | (() => T),
): ((getSet: GetSet<T>) => T) {
  return stateHandlers.letHandler(defaultValue)
}

export function firstLetState <T>(
  defaultValue: T | (() => T),
) {
  const config: Config = setUseMemory.stateConfig
  // State first time run
  const initValue = defaultValue instanceof Function ? defaultValue() : defaultValue
  const push: StateConfigItem<T> = {
    get: function getPushState() {
      return getStateValue(push) as T
    },
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return makeStateResult(initValue, push)
}

export function reLetState <T>() {
  const config: Config = setUseMemory.stateConfig
  const rearray = config.rearray as State

  const restate = rearray[config.array.length]
  let oldValue = getStateValue(restate) as T

  const push: StateConfigItem<T> = {
    get: function getLetState(){
      return getStateValue(push) as T
    },
    defaultValue: restate.defaultValue,
  }

  config.array.push(push)

  return makeStateResult(oldValue, push)
}

function makeStateResult<T>(
  initValue: T,
  push: StateConfigItem<T>,
) {
  return function msr(y: any) {
    push.callback = y
    return initValue
  }
}
