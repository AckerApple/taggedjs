/** File largely responsible for reacting to element events, such as onclick */
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { renderSupport } from '../tag/render/renderSupport.function.js';
import { updateExistingTagComponent } from '../tag/update/updateExistingTagComponent.function.js';
const useLocks = true;
const noData = 'no-data-ever';
const promiseNoData = 'promise-no-data-ever';
export function bindSubjectCallback(value, support) {
    const subjectFunction = (element, args) => {
        return runTagCallback(subjectFunction.tagFunction, subjectFunction.support, element, args);
    };
    // link back to original. Mostly used for <div oninit ondestroy> animations
    subjectFunction.tagFunction = value;
    subjectFunction.support = support;
    return subjectFunction;
}
export function runTagCallback(value, support, bindTo, args) {
    const tag = findTagToCallback(support);
    const global = tag.subject.global;
    if (global.deleted) {
        return noData;
    }
    const method = value.bind(bindTo);
    tag.subject.global.locked = useLocks; // prevent another render from re-rendering this tag
    const callbackResult = method(...args);
    return afterTagCallback(tag, callbackResult);
}
export function afterTagCallback(tag, callbackResult) {
    const global = tag.subject.global;
    delete global.locked;
    const blocked = global.blocked;
    if (blocked.length) {
        const lastResult = runBlocked(tag);
        return checkAfterCallbackPromise(callbackResult, lastResult, global);
    }
    const result = renderCallbackSupport(global.newest, callbackResult, global);
    return result;
}
export function findTagToCallback(support) {
    // If we are NOT a component than we need to render my owner instead
    if (support.templater.tagJsType === ValueTypes.templater) {
        const owner = support.ownerSupport;
        return findTagToCallback(owner);
    }
    return support;
}
function renderCallbackSupport(last, callbackResult, global) {
    if (global.deleted) {
        return noData; // || last.global.deleted
    }
    renderSupport(last, true);
    return checkAfterCallbackPromise(callbackResult, last, global);
}
export function checkAfterCallbackPromise(callbackResult, last, global) {
    if (callbackResult instanceof Promise) {
        last.subject.global.locked = useLocks;
        return callbackResult.then(() => {
            delete last.subject.global.locked;
            if (global.deleted) {
                return promiseNoData; // tag was deleted during event processing
            }
            delete last.subject.global.locked;
            renderSupport(global.newest, true);
            return promiseNoData;
        });
    }
    return noData;
}
export function runBlocked(tag) {
    const global = tag.subject.global;
    const blocked = global.blocked;
    while (blocked.length > 0) {
        const block = blocked[0];
        blocked.splice(0, 1);
        const lastResult = updateExistingTagComponent(block.ownerSupport, block, block.subject);
        global.newest = lastResult;
    }
    return global.newest;
}
//# sourceMappingURL=bindSubjectCallback.function.js.map