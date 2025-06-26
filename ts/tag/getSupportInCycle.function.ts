import { setUseMemory } from'../state/index.js'
import { AnySupport } from './index.js'

export function getSupportInCycle() {
  return setUseMemory.stateConfig.support
}

export function setSupportInCycle(support: AnySupport) {
  return setUseMemory.stateConfig.support = support
}
