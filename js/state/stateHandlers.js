import { setUseMemory } from './setUseMemory.object.js';
import { getStateValue } from './getStateValue.function.js';
import { BasicTypes } from '../tag/ValueTypes.enum.js';
export function runRestate() {
    const config = setUseMemory.stateConfig;
    const rearray = config.rearray;
    const restate = rearray[config.stateArray.length];
    config.stateArray.push(restate);
    return restate.defaultValue;
}
export function runFirstState(defaultValue) {
    const config = setUseMemory.stateConfig;
    // State first time run
    let initValue = defaultValue;
    if (typeof (defaultValue) === BasicTypes.function) {
        initValue = defaultValue();
    }
    // the state is actually intended to be a function
    if (typeof (initValue) === BasicTypes.function) {
        const original = initValue;
        initValue = function initValueFun(...args) {
            const result = original(...args);
            return result;
        };
        initValue.original = original;
    }
    const push = {
        get: function pushState() {
            return getStateValue(push);
        },
        defaultValue: initValue,
    };
    config.stateArray.push(push);
    return initValue;
}
//# sourceMappingURL=stateHandlers.js.map