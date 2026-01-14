import { ContextItem } from '../tag/index.js'
import { createTrigger } from './callback.function.js'
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'

const emptyCallback = () => undefined

/** Attach a promise to the render cycle so resolve triggers a re-render. */
export function promise(
  target: Promise<unknown>,
) {
  const context = getContextInCycle() as ContextItem
  const callbackState = state({ callback: emptyCallback })
  const promiseState = state({ current: undefined as Promise<unknown> | undefined })
  const trigger = state(() => createTrigger(
    context,
    setUseMemory.stateConfig,
    callbackState,
  ))

  if (promiseState.current !== target) {
    promiseState.current = target
    const currentPromise = target
    target.then(() => {
      if (promiseState.current !== currentPromise) {
        return
      }
      trigger()
    })
  }
}
