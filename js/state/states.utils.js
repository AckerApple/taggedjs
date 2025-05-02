import { setUseMemory } from './setUseMemory.object.js';
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js';
export function firstStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    // State first time run
    config.states[config.statesIndex] = setter;
    // const support = config.support as AnySupport
    // support.states[config.statesIndex] = setter
    ++config.statesIndex;
    return setter((...args) => {
        // state(args)
        return args;
    });
}
/** aka statesHandler */
export function reStatesHandler(setter) {
    const config = setUseMemory.stateConfig;
    const support = config.support;
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
    let index = 0;
    const resetter = (..._args) => {
        // state(value) // fake call and do not care about result
        // fake state() having been called
        /*
        config.stateArray.push({
          get: () => args,
          defaultValue: args,
        })
        */
        // const lastValue = lastValues[index]
        /*
        let lastValue: any
        oldStates((...x) => {
          return lastValue = x
        })
    */
        ++index;
        return lastValues;
    };
    //;(config.support as AnySupport).states[config.statesIndex] = setter
    config.states[config.statesIndex] = setter;
    ++config.statesIndex;
    return setter(resetter);
}
//# sourceMappingURL=states.utils.js.map