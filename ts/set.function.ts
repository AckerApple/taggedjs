import { StateMismatchError } from "./errors.js"
import { Tag } from "./Tag.class.js"
import { TagSupport } from "./TagSupport.class.js"
import { setUse } from "./setUse.function.js"

export type StateConfig<T> = (x: T) => [T, T]

export type StateConfigItem<T> = {
  callback?: StateConfig<T>
  lastValue?: T
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value
}

export type StateConfigArray = StateConfigItem<any>[]

export type Config = {
  array: StateConfigArray // state memory on the first render
  rearray: StateConfigArray // state memory to be used before the next render
}

export type State = {
  newest: StateConfigArray
  // oldest?: StateConfigArray
  // config: Config
}

// TODO: rename
setUse.memory.stateConfig = {
  array: [] as StateConfigArray, // state memory on the first render
  rearray: [] as StateConfigArray, // state memory to be used before the next render
} as Config

export type GetSet<T> = (y: T) => [T, T]

export function makeStateResult<T>(
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

const waitingStates: (() => unknown)[] = []
export function onNextStateOnly(callback: () => unknown) {
  const config: Config = setUse.memory.stateConfig
  
  if(!config.rearray.length) {
    callback()
    return
  }

  waitingStates.push(callback)
}

setUse({
  beforeRender: (tagSupport: TagSupport) => initState(tagSupport),
  beforeRedraw: (tagSupport: TagSupport) => initState(tagSupport),
  afterRender: (
    tagSupport: TagSupport,
    // tag: Tag,
  ) => {
    const state: State = tagSupport.memory.state
    const config: Config = setUse.memory.stateConfig
    
    if(config.rearray.length) {
      if(config.rearray.length !== config.array.length) {
        const message = `States lengths mismatched ${config.rearray.length} !== ${config.array.length}`
        const error = new StateMismatchError(message,{
          oldStates: config.array,
          newStates: config.rearray,
          component: tagSupport.templater?.wrapper.original
        })        
        throw error
      }
    }
    
    config.rearray = [] // clean up any previous runs

    state.newest = [...config.array]
    
    // config.array.length = 0
    config.array = []

    waitingStates.forEach(callback => callback())
    waitingStates.length = 0
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

  return oldValue
}

export class StateEchoBack {}

function initState(
  tagSupport: TagSupport
) {
  const state = tagSupport.memory.state as State
  const config: Config = setUse.memory.stateConfig
  
  // TODO: This guard may no longer be needed
  if (config.rearray.length) {
    const message = 'last array not cleared'
    console.error(message, {
      config,
      component: tagSupport.templater?.wrapper.original,
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
    config.rearray.push( ...state.newest )
  }
}

/** Used for variables that need to remain the same variable during render passes */
export function set <T>(
  defaultValue: T | (() => T),
): T {
  const config: Config = setUse.memory.stateConfig
  let getSetMethod: StateConfig<T>
  
  const restate = config.rearray[config.array.length]
  if(restate) {
    let oldValue = getStateValue(restate) as T
    getSetMethod = ((x: T) => [oldValue, oldValue = x])
    const push: StateConfigItem<T> = {
      callback: getSetMethod,
      lastValue: oldValue,
      defaultValue: restate.defaultValue,
    }

    config.array.push(push)

    return oldValue
  }

  // State first time run
  const defaultFn = defaultValue instanceof Function ? defaultValue : () => defaultValue
  let initValue = defaultFn()

  getSetMethod = ((x: T) => [initValue, initValue = x])
  const push: StateConfigItem<T> = {
    callback: getSetMethod,
    lastValue: initValue,
    defaultValue: initValue,
  }
  config.array.push(push)
  
  return initValue
}
