import { setUseMemory } from './setUseMemory.object.js'
import { State, StateConfigItem } from './state.types.js'
import { getStateValue } from './getStateValue.function.js'
import { BasicTypes } from '../tag/ValueTypes.enum.js'
import { ContextStateSupport, UnknownFunction } from '../tag/index.js'
import { StateMemory } from './StateMemory.type.js'
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js'

export function runRestate () {
  const config: StateMemory = setUseMemory.stateConfig
  const rearray = config.rearray as State

  const restate = rearray[config.state.length]
  config.state.push(restate)
  return restate.defaultValue
}

export function runFirstState <T>(
  defaultValue: T | (() => T),
) {
  const config: StateMemory = setUseMemory.stateConfig
  const context = getContextInCycle()

  if( !context || !context.state ) {
    const msg = 'State requested but TaggedJs is not currently rendering a tag or host'
    console.error(msg, {
      config,
      context,
      function: config.support?.templater.wrapper?.original
    })
    throw new Error(msg)
  }

  const newer = context.state.newer as ContextStateSupport
  config.state = newer.state

  // State first time run
  let initValue = defaultValue
  
  if(typeof(defaultValue) === BasicTypes.function) {
    initValue = (defaultValue as () => T)()
  }

  // the state is actually intended to be a function
  if(typeof(initValue) === BasicTypes.function) {
    const original = initValue as UnknownFunction
    
    initValue = function initValueFun(...args: any[]) {
      const result = original(...args)
      return result
    } as any

    ;(initValue as any).original = original
  }

  const push: StateConfigItem<T> = {
    get: function pushState() {
      return getStateValue(push) as T
    },
    defaultValue: initValue as T,
  }
  config.state.push(push)
  
  return initValue as T
}
