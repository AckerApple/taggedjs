import { setUseMemory } from './setUseMemory.object.js'
import { StateMemory } from './StateMemory.type.js'
import { StateSet } from './states.utils.js'

/** @deprecated - Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function states(
  setter: (
    set: StateSet,
    direction?: number,
  ) => any
): void {
  const config: StateMemory = setUseMemory.stateConfig
  return config.handlers.statesHandler(setter)
}
