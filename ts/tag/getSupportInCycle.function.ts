import { setUseMemory } from'../state/index.js'

export function getSupportInCycle() {
  return setUseMemory.stateConfig.support
}
