import { StateMismatchError } from '../errors'
import { BaseTagSupport } from '../TagSupport.class'
import { setUse } from './setUse.function'

export type StateConfig<T> = (x: T) => [T, T]

export type StateConfigItem<T> = {
  get: () => T // TODO: only a convenience, not needed, remove
  callback?: StateConfig<T>
  lastValue?: T
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value
}

export type StateConfigArray = StateConfigItem<any>[]

export type Config = {
  tagSupport: BaseTagSupport
  array: StateConfigArray // state memory on the first render
  rearray?: StateConfigArray // state memory to be used before the next render
}

export type State = {
  newest: StateConfigArray
  // update: () => any
  // oldest?: StateConfigArray
  // config: Config
}

// TODO: rename
setUse.memory.stateConfig = {
  array: [] as StateConfigArray, // state memory on the first render
  // rearray: [] as StateConfigArray, // state memory to be used before the next render
} as Config

export type GetSet<T> = (y: T) => [T, T]

setUse({
  beforeRender: (tagSupport: BaseTagSupport) => initState(tagSupport),
  beforeRedraw: (tagSupport: BaseTagSupport) => initState(tagSupport),
  afterRender: (
    tagSupport: BaseTagSupport,
    // tag: Tag,
  ) => {
    const state: State = tagSupport.memory.state
    const config: Config = setUse.memory.stateConfig
    const rearray = config.rearray as unknown as State[]
    
    if(rearray.length) {
      if(rearray.length !== config.array.length) {
        const message = `States lengths has changed ${rearray.length} !== ${config.array.length}. Typically occurs when a function is intended to be wrapped with a tag() call`
        const details = {
          oldStates: config.array,
          newStates: config.rearray,
          component: tagSupport.templater?.wrapper.original,
        }
        const error = new StateMismatchError(message,details)
        console.warn(message,details)
        throw error
      }
    }
    
    delete config.rearray // clean up any previous runs

    state.newest = config.array // [...config.array]
    state.newest.forEach(item => item.lastValue = getStateValue(item)) // set last values
    
    config.array = []
  }
})


export function getStateValue<T>(
  // state: StateConfig,
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
  const state = tagSupport.memory.state as State
  const config: Config = setUse.memory.stateConfig
  
  // TODO: This guard may no longer be needed
  if (config.rearray) {
    const message = 'last state not cleared. Possibly in the middle of rendering one component and another is trying to render'
    console.error(message, {
      config,
      component: tagSupport.templater?.wrapper.original,
      wasInMiddleOf: config.tagSupport?.templater.wrapper.original,
      state,
      expectedClearArray: config.rearray,
    })

    throw new StateMismatchError(message, {
      config,
      component: tagSupport.templater?.wrapper.original,
      state,
      expectedClearArray: config.rearray,
    })
  }

  // TODO: this maybe redundant and not needed
  config.rearray = [] // .length = 0

  if(state?.newest.length) {
    state.newest.map(state => getStateValue(state))
    config.rearray.push( ...state.newest )
  }

  config.tagSupport = tagSupport
}
