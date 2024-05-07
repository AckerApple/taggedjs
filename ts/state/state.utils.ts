import { StateMismatchError } from '../errors'
import { BaseTagSupport, TagSupport } from '../TagSupport.class'
import { Wrapper } from '../TemplaterResult.class'
import { setUse } from './setUse.function'

export type StateConfig<T> = (x: T) => [T, T]

export type StateConfigItem<T> = {
  get: () => T // TODO: only a convenience, not needed, remove
  callback?: StateConfig<T>
  lastValue?: T
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value
}

export type Config = {
  tagSupport?: BaseTagSupport
  array: State // state memory on the first render
  rearray?: State // state memory to be used before the next render
}

export type State = StateConfigItem<any>[]

setUse.memory.stateConfig = {
  array: [] as State, // state memory on the first render
  // rearray: [] as State,
} as Config

export type GetSet<T> = (y: T) => [T, T]

const beforeRender = (tagSupport: BaseTagSupport) => initState(tagSupport)

setUse({
  beforeRender,
  beforeRedraw: beforeRender,
  afterRender: (
    tagSupport: BaseTagSupport,
  ) => {
    const memory = tagSupport.memory
    // const state: State = memory.state
    const config: Config = setUse.memory.stateConfig
    const rearray = config.rearray as unknown as State[]
    
    if(rearray.length) {
      if(rearray.length !== config.array.length) {
        const message = `States lengths has changed ${rearray.length} !== ${config.array.length}. Typically occurs when a function is intended to be wrapped with a tag() call`
        const wrapper = tagSupport.templater?.wrapper as Wrapper
        const details = {
          oldStates: config.array,
          newStates: config.rearray,
          tagFunction: wrapper.original,
        }
        const error = new StateMismatchError(message,details)
        console.warn(message,details)
        throw error
      }
    }
    
    delete config.rearray // clean up any previous runs
    delete config.tagSupport

    memory.state = config.array // [...config.array]
    memory.state.forEach(item => item.lastValue = getStateValue(item)) // set last values
    
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

  const oldState = callback(StateEchoBack as any) // get value and set to undefined
  const [oldValue] = oldState
  const [checkValue] = callback( oldValue ) // set back to original value

  if(checkValue !== StateEchoBack) {
    const message = 'State property not used correctly. Second item in array is not setting value as expected.\n\n' +
    'For "let" state use `let name = state(default)(x => [name, name = x])`\n\n' +
    'For "const" state use `const name = state(default)()`\n\n' +
    'Problem state:\n' + (callback ? callback.toString() : JSON.stringify(state)) +'\n'
    
    console.error(message, {state, callback, oldState, oldValue, checkValue})
    
    throw new Error(message)
  }

  // state.lastValue = oldValue

  return oldValue
}

export class StateEchoBack {}

function initState(
  tagSupport: BaseTagSupport
) {
  const memory = tagSupport.memory
  const state = memory.state as State
  const config: Config = setUse.memory.stateConfig
  
  // TODO: This guard may no longer be needed
  if (config.rearray) {
    checkStateMismatch(tagSupport, config, state)
  }

  config.rearray = []
  if(state?.length) {
    state.forEach(state => getStateValue(state))
    config.rearray.push( ...state )
  }

  config.tagSupport = tagSupport
}

function checkStateMismatch(
  tagSupport: BaseTagSupport,
  config: Config,
  state: State,
) {
  const wrapper = tagSupport.templater?.wrapper as Wrapper
  const wasWrapper = config.tagSupport?.templater.wrapper as Wrapper
  const message = 'last state not cleared. Possibly in the middle of rendering one component and another is trying to render'

  if(!wasWrapper) {
    return // its not a component or was not a component before
  }

  console.error(message, {
    config,
    tagFunction: wrapper.original,
    wasInMiddleOf: wasWrapper.original,
    state,
    expectedClearArray: config.rearray,
  })

  throw new StateMismatchError(message, {
    config,
    tagFunction: wrapper.original,
    state,
    expectedClearArray: config.rearray,
  })
}