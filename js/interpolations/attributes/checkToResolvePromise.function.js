/** File largely responsible for reacting to element events, such as onclick */
import { isPromise } from '../../isInstance.js';
import { getUpTags } from './getUpTags.function.js';
import { renderTagUpdateArray } from './renderTagArray.function.js';
export function checkToResolvePromise(callbackResult, last, { resolvePromise, resolveValue }) {
    const isProm = isPromise(callbackResult);
    if (isProm) {
        return callbackResult.then(thenResolveBy(last, resolvePromise));
    }
    return resolveValue(callbackResult);
}
export function thenResolveBy(last, resolvePromise) {
    return (x) => {
        const subject = last.context;
        const global = subject.global;
        // delete subject.locked
        if (subject.deleted === true ||
            global?.deleted === true // this maybe deprecated
        ) {
            return resolvePromise(x); // tag was deleted during event processing
        }
        const tagsToUpdate = getUpTags(last);
        renderTagUpdateArray(tagsToUpdate);
        return resolvePromise(x);
    };
}
//# sourceMappingURL=checkToResolvePromise.function.js.map