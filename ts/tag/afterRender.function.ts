import { StateMemory } from '../state/StateMemory.type.js'
import { setUseMemory } from '../state/setUse.function.js'
import { AnySupport } from './Support.class.js'
import { checkStateMismatch } from './checkStateMismatch.function.js'

/** Compares states of previous renders
 * @property support - The workflow that supports a single tag 
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterRender(
  support: AnySupport,
  ownerSupport?: AnySupport,
) {
  const subject = support.subject
  ++subject.renderCount

  const config: StateMemory = setUseMemory.stateConfig
  delete config.support
  support.state = config.stateArray
  // support.states = config.states
  
  setUseMemory.tagClosed$.next(ownerSupport)
  checkStateMismatch(config, support)
  subject.global.newest = support
}
