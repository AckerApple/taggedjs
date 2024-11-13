import { setUseMemory } from './setUseMemory.object.js'

/** Used for variables that need to remain the same variable during render passes */
export function state <T>(
  defaultValue: T | (() => T),
): T {
  return setUseMemory.stateConfig.handlers.handler(defaultValue)
}
