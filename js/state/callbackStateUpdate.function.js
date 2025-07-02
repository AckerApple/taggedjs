import { renderSupport } from '../render/renderSupport.function.js';
import { isPromise } from '../isInstance.js';
export default function callbackStateUpdate(support, oldStates, callback, ...args) {
    const global = support.context.global;
    const newestSupport = global.newest;
    // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
    //syncStatesArray(newestSupport.states, oldStates)
    // run the callback
    const maybePromise = callback(...args);
    renderSupport(newestSupport);
    if (isPromise(maybePromise)) {
        maybePromise.finally(() => {
            renderSupport(newestSupport);
        });
    }
    // return undefined as T
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map