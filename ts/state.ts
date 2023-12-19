import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./tagRunner.js"

export type StateConfig = ((x?: any) => [any, any])

export type StateConfigArray = StateConfig[]

export type State = {
  newest: StateConfigArray
  oldest?: StateConfigArray
}

export type StateTagSupport = TagSupport & {
  state?: State
}

export const config = {
  array: [] as StateConfigArray,
  rearray: [] as StateConfigArray,
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
  const restate = config.rearray[config.array.length]
  if(restate) {
    const oldValue = getStateValue(restate)
    config.array.push( getSetMethod as any )
    return oldValue // return old value instead
  }

  config.array.push(getSetMethod as any)
  return defaultValue
}

setUse({
  beforeRender: (tagSupport: StateTagSupport) => {
    tagSupport.state = tagSupport.state || {
      newest: [],// oldest: [],
    }
  },
  beforeRedraw: (
    tagSupport: StateTagSupport,
  ) => {
    const state = tagSupport.state
    config.rearray.length = 0
    if(state?.newest.length) {
      // state.oldest = [...state.newest]
      config.rearray.push(...state.newest)
    }
  },
  afterRender: (
    tagSupport: StateTagSupport,
  ) => {
    if(config.rearray.length) {
      if(config.rearray.length !== config.array.length) {
        throw new Error(`States lengths mismatched ${config.rearray.length} !== ${config.array.length}`)
      }
    }

    config.rearray.length = 0 // clean up any previous runs

    const state = tagSupport.state as State
    state.newest.length = 0
    state.newest.push(...config.array) as any
    state.oldest = state.oldest || [...config.array] // always preserve oldest
    config.array.length = 0
  }
})


export function getStateValue(state: StateConfig) {
  const [oldValue] = state(EchoBack) // get value and set to undefined
  const [checkValue] = state( oldValue ) // set back to original value

  if(checkValue !== EchoBack) {
    const error = new Error(
      'State property not used correctly.\n\n' +
      'For "let" state use `let name = state(default, x => [name, name = x])`\n\n' +
      'For "const" state use `const name = state(default)`\n\n' +
      'Problem function:\n' + state +'\n')
    throw error
  }

  return oldValue
}

class EchoBack {}