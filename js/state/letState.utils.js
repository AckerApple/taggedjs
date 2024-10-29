import { getStateValue } from './getStateValue.function.js';
import { BasicTypes } from '../tag/ValueTypes.enum.js';
import { setUseMemory } from './setUse.function.js';
export function firstLetState(defaultValue) {
    const config = setUseMemory.stateConfig;
    // State first time run
    const initValue = typeof (defaultValue) === BasicTypes.function ? defaultValue() : defaultValue;
    const push = {
        get: function getPushState() {
            return getStateValue(push);
        },
        defaultValue: initValue,
    };
    config.stateArray.push(push);
    return makeStateResult(initValue, push);
}
export function reLetState() {
    const config = setUseMemory.stateConfig;
    const rearray = config.rearray;
    const restate = rearray[config.stateArray.length];
    const oldValue = getStateValue(restate);
    const push = {
        get: function getLetState() {
            return getStateValue(push);
        },
        defaultValue: restate.defaultValue,
    };
    config.stateArray.push(push);
    return makeStateResult(oldValue, push);
}
function makeStateResult(initValue, push) {
    return function msr(y) {
        push.callback = y;
        return initValue;
    };
}
//# sourceMappingURL=letState.utils.js.map