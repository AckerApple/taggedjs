import { setUseMemory } from './setUseMemory.object.js';
import { getStateValue } from './getStateValue.function.js';
import { BasicTypes } from '../tag/ValueTypes.enum.js';
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
export function runRestate() {
    const config = setUseMemory.stateConfig;
    const rearray = config.rearray;
    const restate = rearray[config.state.length];
    config.state.push(restate);
    return restate.defaultValue;
}
export function runFirstState(defaultValue) {
    const config = setUseMemory.stateConfig;
    const context = getContextInCycle();
    if (!context || !context.state) {
        const msg = 'State requested but TaggedJs is not currently rendering a tag or host';
        console.error(msg, {
            config,
            context,
            function: config.support?.templater.wrapper?.original
        });
        throw new Error(msg);
    }
    const newer = context.state.newer;
    config.state = newer.state;
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
    config.state.push(push);
    return initValue;
}
//# sourceMappingURL=stateHandlers.js.map