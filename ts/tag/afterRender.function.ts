import { StateMemory } from '../state/StateMemory.type.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { AnySupport } from './getSupport.function.js'
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
    
  support.state = config.stateArray
  support.states = config.states
  subject.global.newest = support
  
  checkStateMismatch(config, support)
  
  delete config.prevSupport // only this one really needed
  delete config.support
  delete (config as any).stateArray
  delete (config as any).states
  
  setUseMemory.tagClosed$.next(ownerSupport)
}
