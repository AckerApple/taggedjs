import { getChildTagsToSoftDestroy, unsubscribeFrom } from '../tag/destroyContexts.function.js';
import { getNewGlobal } from '../tag/update/getNewGlobal.function.js';
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js';
/** used when a tag swaps content returned */
export function softDestroySupport(lastSupport) {
    const context = lastSupport.context;
    const global = context.global;
    const { subs, tags } = getChildTagsToSoftDestroy(context.contexts);
    softDestroyOne(context);
    for (const child of tags) {
        const cGlobal = child.context.global;
        if (cGlobal.deleted === true) {
            return;
        }
        softDestroyOne(child.context);
    }
    const mySubs = global.subscriptions;
    if (mySubs) {
        subs.forEach(unsubscribeFrom);
    }
    getNewGlobal(context);
}
function softDestroyOne(context) {
    context.global.deleted = true; // the children are truly destroyed but the main support will be swapped
    smartRemoveKids(context, []);
    delete context.contexts;
}
//# sourceMappingURL=softDestroySupport.function.js.map