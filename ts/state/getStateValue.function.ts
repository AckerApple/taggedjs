import { getCallbackValue } from './state.utils.js'
import { StateConfigItem } from './state.types.js'

const badLetState = 'letState function incorrectly used. Second item in array is not setting expected value.\n\n' +
'For "let" state use `let name = state(default)(x => [name, name = x])`\n\n' +
'For "const" state use `const name = state(default)()`\n\n' +
'Problem state:\n'

export function getStateValue<T>(
  state: StateConfigItem<T>,
) {
  const callback = state.callback
  
  // state()
  if(!callback) {
    return state.defaultValue
  }

  // letState()
  const [value,checkValue] = getCallbackValue(callback)

  // TODO: not needed in production, needed in development
  /*
  if(checkValue !== StateEchoBack) {
    const message = badLetState + (callback ? callback.toString() : JSON.stringify(state)) +'\n'    
    console.error(message, {state, callback, value, checkValue})
    throw new Error(message)
  }
  */

  return value
}
