// import { State } from './state.types.js'
import { renderSupport } from '../tag/render/renderSupport.function.js';
import { syncStates } from './syncStates.function.js';
import { isPromise } from '../isInstance.js';
export default function callbackStateUpdate(support, callback, oldState, // State,
...args) {
    const global = support.subject.global;
    support = global.newest;
    const state = support.state;
    // ensure that the oldest has the latest values first
    syncStates(state, oldState.stateArray, support.states, oldState.states);
    // run the callback
    const maybePromise = callback(...args);
    // send the oldest state changes into the newest
    syncStates(oldState.stateArray, state, oldState.states, support.states);
    renderSupport(support);
    if (isPromise(maybePromise)) {
        maybePromise.finally(() => {
            // send the oldest state changes into the newest
            syncStates(oldState.stateArray, state, oldState.states, support.states);
            renderSupport(support);
        });
    }
    // return undefined as T
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map