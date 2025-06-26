// taggedjs-no-compile
/** File largely responsible for reacting to element events, such as onclick */
import { isPromise } from '../../isInstance.js';
import { getUpTags } from './getUpTags.function.js';
import { renderTagUpdateArray } from './renderTagArray.function.js';
import { syncSupports } from '../../state/syncStates.function.js';
export function checkToResolvePromise(callbackResult, last, global, mode, { resolvePromise, resolveValue }) {
    const isProm = isPromise(callbackResult);
    if (isProm) {
        const subject = last.context;
        // const global0 = subject.global as SupportTagGlobal
        subject.locked = true;
        return callbackResult.then(thenResolveBy(last, resolvePromise));
    }
    return resolveValue(callbackResult);
}
export function thenResolveBy(last, resolvePromise) {
    return (x) => {
        const global = last.context.global;
        //clearTimeout(timeout)
        if (global.deleted === true) {
            return resolvePromise(x); // tag was deleted during event processing
        }
        const subject = last.context;
        const global1 = last.context.global;
        delete subject.locked;
        // The promise may have then changed old variables, lets update forward
        syncSupports(last, global1.newest);
        const tagsToUpdate = getUpTags(last);
        renderTagUpdateArray(tagsToUpdate);
        return resolvePromise(x);
    };
}
//# sourceMappingURL=checkToResolvePromise.function.js.map