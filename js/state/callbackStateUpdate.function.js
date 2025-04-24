import { renderSupport } from '../tag/render/renderSupport.function.js';
import { syncSupports } from './syncStates.function.js';
import { isPromise } from '../isInstance.js';
export default function callbackStateUpdate(support, callback, oldState, // State,
...args) {
    const global = support.subject.global;
    const newestSupport = global.newest;
    // const state = newestSupport.state
    // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
    syncSupports(newestSupport, support);
    /*
    syncStates(
      state, // stateFrom
      oldState.stateArray, // stateTo
      newestSupport.states, // intoStates
      oldState.states, // statesFrom
    )
    */
    // run the callback
    const maybePromise = callback(...args);
    // OLDEST UPDATE NEWEST: send the oldest state changes into the newest
    syncSupports(support, newestSupport);
    /*
    syncStates(
      oldState.stateArray, // stateFrom
      state, // stateTo
      oldState.states, // intoStates
      newestSupport.states, // statesFrom
    )
    */
    renderSupport(newestSupport);
    if (isPromise(maybePromise)) {
        maybePromise.finally(() => {
            // send the oldest state changes into the newest
            syncSupports(support, newestSupport);
            /*
            syncStates(
              oldState.stateArray,
              state,
              oldState.states,
              newestSupport.states,
            )
            */
            renderSupport(newestSupport);
        });
    }
    // return undefined as T
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map