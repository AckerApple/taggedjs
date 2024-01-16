import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./tagRunner.js"

export type StateConfig = ((x?: any) => [any, any])

export type StateConfigArray = {callback: StateConfig, lastValue?: any}[]

export type State = {
  newest: StateConfigArray
  oldest?: StateConfigArray
}

// TODO: rename
export const config = {
  array: [] as StateConfigArray, // state memory on the first render
  rearray: [] as StateConfigArray, // state memory to be used before the next render
}

/**
 * @template T
 * @param {T} defaultValue 
 * @returns {T}
 */
export function state <T>(
  defaultValue: T,
  getSetMethod?: (x: T) => [T, T],
): T {
  /*if(!getSetMethod) {
    getSetMethod = (x: any) => [x, x]
  }*/

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
  beforeRender: (tagSupport: TagSupport) => {
    tagSupport.memory.state = tagSupport.memory.state || {
      newest: [],// oldest: [],
    }
  },
  beforeRedraw: (
    tagSupport: TagSupport,
  ) => {
    //config.array.length = 0
    const state: State = tagSupport.memory.state
    
    config.rearray.length = 0

    if(state?.newest.length) {
      config.rearray.push( ...state.newest )
    }
  },
  afterRender: (
    tagSupport: TagSupport,
  ) => {
    if(config.rearray.length) {
      if(config.rearray.length !== config.array.length) {
        const message = `States lengths mismatched ${config.rearray.length} !== ${config.array.length}`
        throw new Error(message)
      }
    }

    config.rearray.length = 0 // clean up any previous runs

    const state = tagSupport.memory.state as State
    state.newest.length = 0
    state.newest.push(...config.array) as any
    state.oldest = state.oldest || [...config.array] // always preserve oldest
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