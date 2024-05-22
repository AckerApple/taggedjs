import { setUse } from '../state'

export function getSupportInCycle() {
  return setUse.memory.stateConfig.tagSupport
}
