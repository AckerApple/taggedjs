import { getStateValue } from './getStateValue.function.js'
import { State, StateConfigItem } from './state.types.js'
import { BasicTypes } from '../tag/ValueTypes.enum.js'
import { setUseMemory } from './setUse.function.js'
import { Config, GetSet } from './state.utils.js'
import { UnknownFunction } from '../tag/index.js'

/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function letState <T>(
  defaultValue: T | (() => T),
): ((getSet: GetSet<T>) => T) {
  const config: Config = setUseMemory.stateConfig
  return config.handlers.letHandler(defaultValue)
}

export function firstLetState <T>(
  defaultValue: T | (() => T),
) {
  const config: Config = setUseMemory.stateConfig
  // State first time run
  const initValue = typeof(defaultValue) === BasicTypes.function ? (defaultValue as UnknownFunction)() : defaultValue
  const push: StateConfigItem<T> = {
    get: function getPushState() {
      return getStateValue(push) as T
    },
    defaultValue: initValue as T,
  }
  config.array.push(push)
  
  return makeStateResult(initValue as T, push)
}

export function reLetState <T>() {
  const config: Config = setUseMemory.stateConfig
  const rearray = config.rearray as State
  const restate = rearray[config.array.length]


  const oldValue = getStateValue(restate) as T

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
