import { StateMismatchError } from '../errors.js';
import { setUse } from './setUse.function.js';
const badLetState = 'letState function incorrectly used. Second item in array is not setting expected value.\n\n' +
    'For "let" state use `let name = state(default)(x => [name, name = x])`\n\n' +
    'For "const" state use `const name = state(default)()`\n\n' +
    'Problem state:\n';
setUse.memory.stateConfig = {
    array: [], // state memory on the first render
    // rearray: [] as State,
};
const beforeRender = (support) => initState(support);
setUse({
    beforeRender,
    beforeRedraw: beforeRender,
    afterRender: (support) => {
        const state = support.state;
        const config = setUse.memory.stateConfig;
        const rearray = config.rearray;
        if (rearray.length) {
            if (rearray.length !== config.array.length) {
                const message = `States lengths have changed ${rearray.length} !== ${config.array.length}. State tracking requires the same amount of function calls every render. Typically this errors is thrown when a state like function call occurs only for certain conditions or when a function is intended to be wrapped with a tag() call`;
                const wrapper = support.templater?.wrapper;
                const details = {
                    oldStates: config.array,
                    newStates: config.rearray,
                    tagFunction: wrapper.parentWrap.original,
                };
                const error = new StateMismatchError(message, details);
                console.warn(message, details);
                throw error;
            }
        }
        delete config.rearray; // clean up any previous runs
        delete config.support;
        state.length = 0;
        state.push(...config.array);
        for (let index = state.length - 1; index >= 0; --index) {
            const item = state[index];
            item.lastValue = getStateValue(item); // set last values
        }
        config.array = [];
    }
});
export function getStateValue(state) {
    const callback = state.callback;
    if (!callback) {
        return state.defaultValue;
    }
    const [value, checkValue] = getCallbackValue(callback);
    if (checkValue !== StateEchoBack) {
        const message = badLetState + (callback ? callback.toString() : JSON.stringify(state)) + '\n';
        console.error(message, { state, callback, value, checkValue });
        throw new Error(message);
    }
    return value;
}
export class StateEchoBack {
}
function initState(support) {
    const state = support.state;
    const config = setUse.memory.stateConfig;
    config.rearray = [];
    const stateLength = state?.length;
    if (stateLength) {
        for (let index = 0; index < stateLength; ++index) {
            getStateValue(state[index]);
        }
        config.rearray.push(...state);
    }
    config.support = support;
}
export function getCallbackValue(callback) {
    const oldState = callback(StateEchoBack); // get value and set to undefined
    const [value] = oldState;
    const [checkValue] = callback(value); // set back to original value
    return [value, checkValue];
}
//# sourceMappingURL=state.utils.js.map