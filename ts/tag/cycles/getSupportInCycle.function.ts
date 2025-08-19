import { setUseMemory } from'../../state/index.js'
import { AnySupport } from '../index.js'
import { setContextInCycle } from './setContextInCycle.function.js'

export function getSupportInCycle() {
  return setUseMemory.stateConfig.support
}

export function setSupportInCycle(support: AnySupport) {
  setContextInCycle(support.context)
  return setUseMemory.stateConfig.support = support
}
