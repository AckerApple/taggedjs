import callbackStateUpdate from './callbackStateUpdate.function.js';
import { paint } from '../tag/index.js';
import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback(callback) {
    const context = getContextInCycle();
    const callbackState = state({
        callback,
    });
    // ensure only one trigger instance created and always returned
    const callbackTrigger = state(() => createTrigger(context, setUseMemory.stateConfig, // setUseMemory.stateConfig.stateArray
    callbackState));
    // always update callback to latest in cycle
    callbackState.callback = callback;
    return callbackTrigger;
}
export function createTrigger(context, oldState, callbackState) {
    const oldStates = oldState.states;
    return function trigger(...args) {
        // ++painting.locks
        const result = callbackStateUpdate(context, oldStates, callbackState.callback, ...args);
        // --painting.locks
        paint();
        return result;
    };
}
//# sourceMappingURL=callback.function.js.map