import callbackStateUpdate from './callbackStateUpdate.function.js'
import { ContextItem, SupportContextItem } from '../tag/index.js'
import { setUseMemory } from './setUseMemory.object.js'
import { StateMemory } from './StateMemory.type.js'
import { state } from './state.function.js'
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js'

/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const context = getContextInCycle() as ContextItem
  
  const callbackState = state({
    callback,
  })

  // ensure only one trigger instance created and always returned
  const callbackTrigger = state(() => createTrigger(
    context,
    setUseMemory.stateConfig, // setUseMemory.stateConfig.stateArray
    callbackState,
  ))

  // always update callback to latest in cycle
  callbackState.callback = callback

  return callbackTrigger as any
}

type CallbackState = {
  callback: any
}

export function createTrigger(
  context: ContextItem,
  oldState: StateMemory,
  callbackState: CallbackState,
) {
  const oldStates = oldState.states

  return function trigger(...args: any[]) {
    return callbackStateUpdate(
      context as SupportContextItem,
      oldStates,
      callbackState.callback,
      ...args
    )
  }
}
