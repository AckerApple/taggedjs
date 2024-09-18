import { AnySupport, BaseSupport, Support } from './Support.class.js'
import { Config } from'../state/state.utils.js'
import { State } from '../state/state.types.js'
import { Wrapper } from './index.js'
import { StateMismatchError } from '../errors.js'

export function checkStateMismatch(
  config: Config,
  support: BaseSupport | Support,
) {
  const rearray = config.rearray as unknown as State
  if(rearray.length && rearray.length !== config.array.length) {
    throwStateMismatch(rearray, support, config)
  }
}

const hint = 'State tracking requires same number of state calls on every render. This error typically occurs when a state call is only reachable behind a condition. Also, wrapping tags that have state, with tag(), often helps when tag is only reachable by a condition.'

function throwStateMismatch(
  rearray: State,
  support: AnySupport,
  config: Config,
) {
  const message = `Saved states between renders are inconsistent. Expected ${rearray.length} states got ${config.array.length}.`
  const wrapper = support.templater?.wrapper as Wrapper
  let tagFunction = wrapper
  
  if((wrapper as any)?.original) {
    tagFunction = (wrapper as any).original
  } else if(wrapper?.parentWrap.original) {
    tagFunction = wrapper.parentWrap.original as any
  }
  
  const details = {
    oldStates: config.array,
    newStates: config.rearray,
    tagFunction,
    templater: support.templater,
  }
  const error = new StateMismatchError(message,details)
  console.error(hint,details)
  throw error
}
