import { StateMismatchError } from '../errors.js'
import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { Wrapper } from '../tag/TemplaterResult.class.js'
import { setUse } from'./setUse.function.js'
import { syncStates } from './syncStates.function.js'

export type StateConfig<T> = (x: T) => [T, T]

export type StateConfigItem<T> = {
  get: () => T // TODO: only a convenience, not needed, remove
  callback?: StateConfig<T>
  lastValue?: T
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value
}

export type Config = {
  tagSupport?: BaseTagSupport | TagSupport
  array: State // state memory on the first render
  rearray?: State // state memory to be used before the next render
}

export type State = StateConfigItem<any>[]

setUse.memory.stateConfig = {
  array: [] as State, // state memory on the first render
  // rearray: [] as State,
} as Config

export type GetSet<T> = (y: T) => [T, T]

const beforeRender = (tagSupport: TagSupport | BaseTagSupport) => initState(tagSupport)

setUse({
  beforeRender,
  beforeRedraw: beforeRender,
  afterRender: (
    tagSupport: TagSupport | BaseTagSupport,
  ) => {
    const memory = tagSupport.memory
    const config: Config = setUse.memory.stateConfig
    const rearray = config.rearray as unknown as State[]
    
    if(rearray.length) {
      if(rearray.length !== config.array.length) {
        const message = `States lengths have changed ${rearray.length} !== ${config.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`
        const wrapper = tagSupport.templater?.wrapper as Wrapper
        const details = {
          oldStates: config.array,
          newStates: config.rearray,
          tagFunction: wrapper.parentWrap.original,
        }
        const error = new StateMismatchError(message,details)
        console.warn(message,details)
        throw error
      }
    }
    
    delete config.rearray // clean up any previous runs
    delete config.tagSupport

    memory.state.length = 0
    memory.state.push(...config.array)
    const state = memory.state
    for (let index = state.length - 1; index >= 0; --index) {
      const item = state[index]
      item.lastValue = getStateValue(item) // set last values
    }

    config.array = []
  }
})

export function getStateValue<T>(
  state: StateConfigItem<T>,
) {
  const callback = state.callback
  
  if(!callback) {
    return state.defaultValue
  }

  const [value,checkValue] = getCallbackValue(callback)

  if(checkValue !== StateEchoBack) {
    const message = 'letState function incorrectly used. Second item in array is not setting expected value.\n\n' +
    'For "let" state use `let name = state(default)(x => [name, name = x])`\n\n' +
    'For "const" state use `const name = state(default)()`\n\n' +
    'Problem state:\n' + (callback ? callback.toString() : JSON.stringify(state)) +'\n'
    
    console.error(message, {state, callback, value, checkValue})
    
    throw new Error(message)
  }

  return value
}

export class StateEchoBack {}

function initState(
  tagSupport: TagSupport | BaseTagSupport
) {
  const memory = tagSupport.memory
  const state = memory.state as State
  const config: Config = setUse.memory.stateConfig

  config.rearray = []
  const stateLength = state?.length
  if(stateLength) {
    for (let index=0; index < stateLength; ++index) {
      getStateValue(state[index])
    }
    config.rearray.push( ...state )
  }

  config.tagSupport = tagSupport
}

export function getCallbackValue<T>(
  callback: StateConfig<T>
): [T, T] {
  const oldState = callback(StateEchoBack as any) // get value and set to undefined
  const [value] = oldState
  const [checkValue] = callback( value ) // set back to original value
  return [value, checkValue]
}
