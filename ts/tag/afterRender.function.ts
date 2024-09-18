import { setUseMemory } from '../state/setUse.function.js'
import { BaseSupport, Support } from './Support.class.js'
import { Config } from'../state/state.utils.js'
import { checkStateMismatch } from './checkStateMismatch.function.js'

/** Compares states of previous renders
 * @property support - The workflow that supports a single tag 
 * @property ownerSupport - undefined when "support" is the app element
 */
export function runAfterRender(
  support: BaseSupport | Support,
  ownerSupport?: Support | BaseSupport,
) {
  const subject = support.subject
  ++subject.renderCount

  const config: Config = setUseMemory.stateConfig
  delete config.support
  support.state = config.array
  
  setUseMemory.tagClosed$.next(ownerSupport)
  checkStateMismatch(config, support)
  subject.global.newest = support
}
