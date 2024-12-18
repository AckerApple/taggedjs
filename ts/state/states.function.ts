import { setUseMemory } from './setUseMemory.object.js'
import { GetSet } from './state.utils.js'
import { StateMemory } from './StateMemory.type.js'

/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function states <T>(
  setter: (
    set: <T>(...args: T[]) => T[]
  ) => any
): ((getSet: GetSet<T>) => T) {
  const config: StateMemory = setUseMemory.stateConfig
  return config.handlers.statesHandler(setter)
}
