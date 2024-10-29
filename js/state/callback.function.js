import callbackStateUpdate from './callbackStateUpdate.function.js';
import { setUseMemory } from './setUse.function.js';
import { syncError } from './callbackMaker.function.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
/** Wrap a function that will be called back. After the wrapper and function are called, a rendering cycle will update display */
export function callback(callback) {
    const support = getSupportInCycle();
    if (!support) {
        throw syncError;
    }
    return createTrigger(support, setUseMemory.stateConfig.stateArray, callback);
}
export function createTrigger(support, oldState, toCallback) {
    return function trigger(...args) {
        const callbackMaker = support.subject.renderCount > 0;
        if (callbackMaker) {
            return callbackStateUpdate(support, toCallback, oldState, ...args);
        }
        // we are in sync with rendering, just run callback naturally
        return toCallback(...args);
    };
}
//# sourceMappingURL=callback.function.js.map