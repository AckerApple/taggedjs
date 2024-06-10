import { renderSupport } from '../tag/render/renderSupport.function.js';
import { syncStates } from './syncStates.function.js';
export default function callbackStateUpdate(support, callback, oldState, ...args) {
    const state = support.state;
    // ensure that the oldest has the latest values first
    syncStates(state, oldState);
    // run the callback
    const maybePromise = callback(...args);
    // send the oldest state changes into the newest
    syncStates(oldState, state);
    renderSupport(support, // support.global.newest as Support,
    false);
    if (maybePromise instanceof Promise) {
        maybePromise.finally(() => {
            // send the oldest state changes into the newest
            syncStates(oldState, state);
            renderSupport(support, // support.global.newest as Support,
            false);
        });
    }
    // return undefined as T
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map