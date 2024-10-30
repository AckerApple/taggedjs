import { getStateValue } from './getStateValue.function.js'
import { State, StateConfigItem } from './state.types.js'
import { BasicTypes } from '../tag/ValueTypes.enum.js'
import { setUseMemory } from './setUse.function.js'
import { UnknownFunction } from '../tag/index.js'
import { StateMemory } from './StateMemory.type.js'

export function firstLetState <T>(
  defaultValue: T | (() => T),
) {
  const config: StateMemory = setUseMemory.stateConfig
  // State first time run
  const initValue = typeof(defaultValue) === BasicTypes.function ? (defaultValue as UnknownFunction)() : defaultValue
  const push: StateConfigItem<T> = {
    get: function getPushState() {
      return getStateValue(push) as T
    },
    defaultValue: initValue as T,
  }
  config.stateArray.push(push)
  
  return makeStateResult(initValue as T, push)
}

export function reLetState <T>() {
  const config: StateMemory = setUseMemory.stateConfig
  const rearray = config.rearray as State
  const restate = rearray[config.stateArray.length]


  const oldValue = getStateValue(restate) as T

  const push: StateConfigItem<T> = {
    get: function getLetState(){
      return getStateValue(push) as T
    },
    defaultValue: restate.defaultValue,
  }

  config.stateArray.push(push)

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
