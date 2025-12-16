import { setUseMemory } from './setUseMemory.object.js';
import { SyncCallbackError } from '../errors.js';
import { createTrigger } from './callback.function.js';
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
export const callbackMaker = () => {
    const context = getContextInCycle();
    // const support = getSupportInCycle()
    // callback as typeof innerCallback
    if (!context) {
        throw syncError;
    }
    const oldState = setUseMemory.stateConfig; // .stateArray
    return function triggerMaker(callback) {
        return createTrigger(context, oldState, { callback });
    };
};
export const syncError = new SyncCallbackError('callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering');
//# sourceMappingURL=callbackMaker.function.js.map