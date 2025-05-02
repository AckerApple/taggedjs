import { runFirstState, runRestate } from './stateHandlers.js';
import { firstStatesHandler, reStatesHandler } from './states.utils.js';
export function initState(support, config) {
    config.handlers.handler = runFirstState;
    config.handlers.statesHandler = firstStatesHandler;
    config.rearray = [];
    config.stateArray = [];
    config.states = [];
    config.statesIndex = 0;
    config.support = support;
}
export function reState(newSupport, prevSupport, config, prevState, prevStates) {
    // set previous state memory
    config.rearray = prevState;
    config.stateArray = [];
    config.states = [];
    //config.states = prevStates
    //config.states = [...prevStates]
    // newSupport.states = [...prevStates]
    // support.states = config.states
    config.statesIndex = 0;
    config.handlers.handler = runRestate;
    config.handlers.statesHandler = reStatesHandler;
    // config.support = support
    config.prevSupport = prevSupport;
}
export class StateEchoBack {
}
/** sends a fake value and then sets back to received value */
export function getCallbackValue(callback) {
    const [value] = callback(StateEchoBack); // get value and set to undefined
    const [checkValue] = callback(value); // set back to original value
    return [value, checkValue];
}
//# sourceMappingURL=state.utils.js.map