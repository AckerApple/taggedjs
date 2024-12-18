import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
export function firstStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    // State first time run
    config.states[config.statesIndex] = setter;
    const support = config.support;
    support.states[config.statesIndex] = setter;
    ++config.statesIndex;
    return setter((...args) => {
        state(args);
        return args;
    });
}
export function reStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    const support = config.support;
    const statesIndex = config.statesIndex;
    const prevSupport = config.prevSupport;
    const oldStates = prevSupport?.states[statesIndex];
    const lastValues = [];
    const regetter = (...args) => {
        lastValues.push(args);
        return args;
    };
    oldStates(regetter);
    let index = 0;
    const resetter = (...args) => {
        // state(value) // fake call and do not care about result
        // fake state() having been called
        config.stateArray.push({
            get: () => args,
            defaultValue: args,
        });
        const lastValue = lastValues[index];
        ++index;
        return lastValue;
    };
    support.states[config.statesIndex] = setter;
    ++config.statesIndex;
    return setter(resetter);
}
//# sourceMappingURL=states.utils.js.map