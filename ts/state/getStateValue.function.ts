import { getCallbackValue } from './state.utils.js'
import { StateConfigItem } from './state.types.js'

export function getStateValue<T>(
  state: StateConfigItem<T>,
) {
  const callback = state.callback
  
  if(!callback) {
    return state.defaultValue
  }

  const [value] = getCallbackValue(callback)
  
  return value
}
