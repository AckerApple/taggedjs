import { AnySupport } from './AnySupport.type.js'
import { State } from '../state/state.types.js'
import { Original, Wrapper } from './index.js'
import { StateMismatchError } from '../errors.js'
import { StateMemory } from '../state/StateMemory.type.js'

export function checkStateMismatch(
  config: StateMemory,
  support: AnySupport,
) {
  const rearray = config.rearray as unknown as State
  if(rearray.length && rearray.length !== config.stateArray.length) {
    throwStateMismatch(rearray, support, config)
  }
}

const hint = 'State tracking requires same number of state calls on every render. This error typically occurs when a state call is only reachable behind a condition. Also, wrapping tags that have state, with tag(), often helps when tag is only reachable by a condition.'

function throwStateMismatch(
  rearray: State,
  support: AnySupport,
  config: StateMemory,
) {
  const message = `Saved states between renders are inconsistent. Expected ${rearray.length} states got ${config.stateArray.length}.`
  const wrapper = support.templater?.wrapper as Wrapper
  let tagFunction: Wrapper | Original = wrapper
  
  if((wrapper as any)?.original) {
    tagFunction = (wrapper as any).original
  } else if(wrapper?.original) {
    tagFunction = wrapper.original as Original
  }
  
  const details = {
    oldStates: config.stateArray,
    newStates: config.rearray,
    tagFunction,
    templater: support.templater,
  }
  const error = new StateMismatchError(message,details)
  console.error(hint,details)
  throw error
}
