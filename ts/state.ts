import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./setUse.function.js"

export type StateConfig = ((x?: any) => [any, any])

export type StateConfigArray = {callback: StateConfig, lastValue?: any}[]

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

/**
 * @template T
 * @param {T} defaultValue 
 * @returns {T}
 */
export function state <T>(
  defaultValue: T,
  getSetMethod?: (x: T) => [T, T],
): T {
  const config: Config = setUse.memory.stateConfig

  const restate = config.rearray[config.array.length]
  if(restate) {
    const oldValue = restate.callback ? getStateValue(restate.callback) : defaultValue
    config.array.push({
      callback: getSetMethod as StateConfig,
      lastValue: oldValue
    })
    return oldValue // return old value instead
  }

  config.array.push({
    callback: getSetMethod as StateConfig,
    lastValue: defaultValue,
  })
  return defaultValue
}

setUse({
  beforeRender: (tagSupport: TagSupport) => initState(tagSupport),
  beforeRedraw: (tagSupport: TagSupport) => initState(tagSupport),
  afterRender: (
    tagSupport: TagSupport,
  ) => {
    const state: State = tagSupport.memory.state
    // const config = state.config
    const config: Config = setUse.memory.stateConfig

    if(config.rearray.length) {
      if(config.rearray.length !== config.array.length) {
        const message = `States lengths mismatched ${config.rearray.length} !== ${config.array.length}`
        
        console.error(message, {
          oldStates: config.array,
          newStates: config.rearray,
          component: tagSupport.templater?.wrapper.original
        })
        
        throw new Error(message)
      }
    }

    config.rearray.length = 0 // clean up any previous runs

    state.newest.length = 0
    state.newest.push(...config.array) as any
    config.array.length = 0
  }
})


export function getStateValue(
  state: StateConfig,
) {
  const oldState = state(StateEchoBack) // get value and set to undefined
  const [oldValue] = oldState
  const [checkValue] = state( oldValue ) // set back to original value

  if(checkValue !== StateEchoBack) {
    const error = new Error(
      'State property not used correctly.\n\n' +
      'For "let" state use `let name = state(default, x => [name, name = x])`\n\n' +
      'For "const" state use `const name = state(default)`\n\n' +
      'Problem function:\n' + state +'\n')
    throw error
  }

  return oldValue
}

export class StateEchoBack {}

function initState(
  tagSupport: TagSupport
) {
  const state = tagSupport.memory.state as State
  const config: Config = setUse.memory.stateConfig
  
  if (config.rearray.length) {
    const message = 'last array not cleared'
    console.error(message, {
      config,
      component: tagSupport.templater?.wrapper.original,
      state,
    })
    throw message
  }

  config.rearray.length = 0

  if(state?.newest.length) {
    config.rearray.push( ...state.newest )
  }
}
