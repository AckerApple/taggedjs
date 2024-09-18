import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { setUseMemory } from './setUse.function.js';
import { SyncCallbackError } from '../errors.js';
import { createTrigger } from './callback.function.js';
export const callbackMaker = () => {
    const support = getSupportInCycle();
    // callback as typeof innerCallback
    if (!support) {
        throw syncError;
    }
    const oldState = setUseMemory.stateConfig.array;
    return function triggerMaker(callback) {
        return createTrigger(support, oldState, callback);
    };
};
export const syncError = new SyncCallbackError('callback() was called outside of synchronous rendering. Use `callback = callbackMaker()` to create a callback that could be called out of sync with rendering');
//# sourceMappingURL=callbackMaker.function.js.map