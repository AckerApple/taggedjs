import { setUseMemory } from './setUseMemory.object.js'

/** Used for variables that need to remain the same variable during render passes
 * Uses current running components read/write variables
*/
export function state <T>(
  defaultValue: T | (() => T),
): T {
  return setUseMemory.stateConfig.handlers.handler(defaultValue)
}
