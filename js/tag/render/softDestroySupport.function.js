import { getChildTagsToSoftDestroy } from '../getChildTagsToDestroy.function.js';
import { smartRemoveKids } from '../smartRemoveKids.function.js';
import { getNewGlobal } from '../update/getNewGlobal.function.js';
/** used when a tag swaps content returned */
export function softDestroySupport(lastSupport) {
    const global = lastSupport.subject.global;
    const { subs, tags } = getChildTagsToSoftDestroy(global.context);
    softDestroyOne(lastSupport);
    for (const child of tags) {
        softDestroyOne(child);
    }
    const mySubs = global.subscriptions;
    if (mySubs) {
        subs.forEach(sub => sub.unsubscribe());
    }
    lastSupport.subject.global = getNewGlobal();
}
function softDestroyOne(child) {
    const global = child.subject.global;
    if (global.deleted === true) {
        return;
    }
    global.deleted = true; // the children are truly destroyed but the main support will be swapped
    smartRemoveKids(child, [], 0);
}
//# sourceMappingURL=softDestroySupport.function.js.map