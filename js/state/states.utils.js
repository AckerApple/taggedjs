import { setUseMemory } from './setUseMemory.object.js';
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js';
function returnArgs(...args) {
    return args;
}
export function firstStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    config.states[config.statesIndex] = setter;
    ++config.statesIndex;
    return setter(returnArgs);
}
/** aka statesHandler */
export function reStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    const statesIndex = config.statesIndex;
    const prevSupport = getSupportWithState(config.prevSupport);
    const prevStates = prevSupport.states;
    // const prevStates = config.states
    const oldStates = prevStates[statesIndex];
    let lastValues = [];
    oldStates(function regetter(...args) {
        lastValues = args;
        return args;
    });
    const resetter = function stateResetter(..._args) {
        return lastValues;
    };
    config.states[config.statesIndex] = setter;
    ++config.statesIndex;
    return setter(resetter);
}
//# sourceMappingURL=states.utils.js.map