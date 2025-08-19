import { StateMemory } from '../state/StateMemory.type.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { AnySupport, ContextItem } from '../tag/index.js'
import { checkStateMismatch } from '../tag/checkStateMismatch.function.js'
import { removeContextInCycle } from '../tag/cycles/setContextInCycle.function.js'

/** Compares states of previous renders
 * @property support - The workflow that supports a single tag 
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterSupportRender(
  support: AnySupport,
  ownerSupport?: AnySupport,
) {
  const subject = support.context
  ++subject.renderCount

  runAfterRender()
  setUseMemory.tagClosed$.next(ownerSupport)
}

/** run after rendering anything with state */
export function runAfterRender() {
  saveState()
  // TODO: prove this is worth having
  // checkStateMismatch(config, support)
  clearStateConfig()
  
  // setUseMemory.tagClosed$.next(ownerSupport)
}

function saveState() {
  const config: StateMemory = setUseMemory.stateConfig
  const subject = config.context as ContextItem
  subject.state = subject.state || {}
  subject.state.newer = { ...config }
  
  const support = config.support
  subject.state.newest = support
}

export function clearStateConfig() {
  const config: StateMemory = setUseMemory.stateConfig

  delete config.prevSupport // only this one really needed
  delete config.support
  delete (config as any).state
  delete (config as any).states
  removeContextInCycle()
}