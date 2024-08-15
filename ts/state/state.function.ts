import { stateHandlers } from './stateHandlers.js'

/** Used for variables that need to remain the same variable during render passes */
export function state <T>(
  defaultValue: T | (() => T),
): T {
  const result = stateHandlers.handler(defaultValue)
  return result
}
