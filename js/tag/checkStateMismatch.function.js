import { StateMismatchError } from '../errors.js';
export function checkStateMismatch(config, support) {
    const rearray = config.rearray;
    if (rearray.length && rearray.length !== config.stateArray.length) {
        throwStateMismatch(rearray, support, config);
    }
}
const hint = 'State tracking requires same number of state calls on every render. This error typically occurs when a state call is only reachable behind a condition. Also, wrapping tags that have state, with tag(), often helps when tag is only reachable by a condition.';
function throwStateMismatch(rearray, support, config) {
    const message = `Saved states between renders are inconsistent. Expected ${rearray.length} states got ${config.stateArray.length}.`;
    const wrapper = support.templater?.wrapper;
    let tagFunction = wrapper;
    if (wrapper?.original) {
        tagFunction = wrapper.original;
    }
    else if (wrapper?.original) {
        tagFunction = wrapper.original;
    }
    const details = {
        oldStates: config.stateArray,
        newStates: config.rearray,
        tagFunction,
        templater: support.templater,
    };
    const error = new StateMismatchError(message, details);
    console.error(hint, details);
    throw error;
}
//# sourceMappingURL=checkStateMismatch.function.js.map