import { renderSupport } from '../render/renderSupport.function.js';
import { isPromise } from '../isInstance.js';
export default function callbackStateUpdate(support, oldStates, callback, ...args) {
    const global = support.context.global;
    const newestSupport = global.newest;
    // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
    //syncStatesArray(newestSupport.states, oldStates)
    // run the callback
    const maybePromise = callback(...args);
    // OLDEST UPDATE NEWEST: send the oldest state changes into the newest
    //syncStatesArray(oldStates, newestSupport.states)
    renderSupport(newestSupport);
    if (isPromise(maybePromise)) {
        maybePromise.finally(() => {
            // send the oldest state changes into the newest
            // syncStatesArray(oldStates, newestSupport.states)
            renderSupport(newestSupport);
        });
    }
    // return undefined as T
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map