import { getChildTagsToSoftDestroy, unsubscribeFrom } from '../destroyContext.function.js';
import { getNewGlobal } from '../update/getNewGlobal.function.js';
import { smartRemoveKids } from '../smartRemoveKids.function.js';
/** used when a tag swaps content returned */
export function softDestroySupport(lastSupport) {
    const subject = lastSupport.subject;
    const global = subject.global;
    const { subs, tags } = getChildTagsToSoftDestroy(global.context);
    softDestroyOne(global);
    for (const child of tags) {
        const cGlobal = child.subject.global;
        if (cGlobal.deleted === true) {
            return;
        }
        softDestroyOne(cGlobal);
    }
    const mySubs = global.subscriptions;
    if (mySubs) {
        subs.forEach(unsubscribeFrom);
    }
    getNewGlobal(subject);
}
function softDestroyOne(global) {
    global.deleted = true; // the children are truly destroyed but the main support will be swapped
    smartRemoveKids(global, []);
}
//# sourceMappingURL=softDestroySupport.function.js.map