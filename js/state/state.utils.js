import { runFirstState } from './stateHandlers.js';
import { firstStatesHandler } from './states.utils.js';
import { setUseMemory } from './setUseMemory.object.js';
import { setContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
/** To be called before rendering anything with a state */
export function initState(context) {
    setContextInCycle(context);
    const config = setUseMemory.stateConfig;
    config.handlers.handler = runFirstState;
    config.handlers.statesHandler = firstStatesHandler;
    config.rearray = [];
    const state = config.state = [];
    const states = config.states = [];
    config.statesIndex = 0;
    const stateMeta = context.state = context.state || {};
    stateMeta.newer = { state, states };
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