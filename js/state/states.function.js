import { setUseMemory } from './setUseMemory.object.js';
/** Used for variables that need to remain the same variable during render passes. If defaultValue is a function it is called only once, its return value is first state, and let value can changed */
export function states(setter) {
    const config = setUseMemory.stateConfig;
    return config.handlers.statesHandler(setter);
}
//# sourceMappingURL=states.function.js.map