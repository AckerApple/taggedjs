import { setUseMemory } from './setUseMemory.object.js';
/** Used for variables that need to remain the same variable during render passes
 * Uses current running components read/write variables
*/
export function state(defaultValue) {
    return setUseMemory.stateConfig.handlers.handler(defaultValue);
}
//# sourceMappingURL=state.function.js.map