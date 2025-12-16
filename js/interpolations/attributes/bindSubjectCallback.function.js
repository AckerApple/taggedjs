// taggedjs-no-compile
/** File largely responsible for reacting to element events, such as onclick */
import { getUpTags } from './getUpTags.function.js';
import { renderTagUpdateArray } from './renderTagArray.function.js';
import { getSupportWithState } from './getSupportWithState.function.js';
import { checkToResolvePromise } from './checkToResolvePromise.function.js';
export function bindSubjectCallback(value, support) {
    const global = support.context.global;
    // MAIN EVENT CALLBACK PROCESSOR
    const subjectFunction = function callbackReplacement(element, args) {
        if (global.deleted === true) {
            return;
        }
        // const newest = global.newest as AnySupport // || subjectFunction.support
        return runTagCallback(subjectFunction.tagFunction, subjectFunction.support, // newest
        // subjectFunction.states, // newest
        element, args);
    };
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    // const component = getSupportWithState(support)
    subjectFunction.support = support;
    // subjectFunction.otherSupport = component
    //const states = component.states // ?.[0]
    // subjectFunction.states = states
    return subjectFunction;
}
export function runTagCallback(value, support, 
// states: StatesSetter[],
bindTo, args) {
    // get actual component owner not just the html`` support
    const component = getSupportWithState(support);
    const subject = component.context;
    // const global = subject.global as SupportTagGlobal // tag.subject.global as TagGlobal
    subject.locked = 1; // prevent another render from re-rendering this tag
    // ++painting.locks
    // sync the new states to the old before the old does any processing
    // syncStatesArray(component.context.state.newest.states, states)
    // ACTUAL CALLBACK TO ORIGINAL FUNCTION
    const callbackResult = value.apply(bindTo, args);
    // sync the old states to the new
    // syncStatesArray(states, component.subject.global.newest.states)
    delete subject.locked;
    // --painting.locks
    const result = afterTagCallback(callbackResult, component);
    return result;
}
export function afterTagCallback(callbackResult, last) {
    const global = last.context.global;
    if (global?.deleted) {
        return;
    }
    const tagsToUpdate = getUpTags(last);
    renderTagUpdateArray(tagsToUpdate);
    return checkToResolvePromise(callbackResult, last, { resolvePromise, resolveValue });
}
const noData = 'no-data-ever';
const promiseNoData = 'promise-no-data-ever';
function resolvePromise() {
    return promiseNoData;
}
function resolveValue() {
    return noData;
}
//# sourceMappingURL=bindSubjectCallback.function.js.map