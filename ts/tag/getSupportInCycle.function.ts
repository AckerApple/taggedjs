import { setUse } from'../state/index.js'

export function getSupportInCycle() {
  return setUse.memory.stateConfig.tagSupport
}
