import { isTagComponent } from '../isInstance.js';
import { runBeforeDestroy } from './tagRunner.js';
import { ValueTypes } from './ValueTypes.enum.js';
export function destroyContext(childTags, ownerSupport) {
    for (const child of childTags) {
        // deleting arrays
        const lastArray = child.lastArray;
        if (lastArray) {
            // recurse
            destroyContext(lastArray, ownerSupport);
            continue;
        }
        const childValue = child.value;
        if (childValue?.tagJsType === ValueTypes.subscribe) {
            childValue.delete(child, ownerSupport);
            child.deleted = true;
            continue;
        }
        const global = child.global;
        if (!global) {
            continue; // not a support contextItem
        }
        const support = child.state.newest;
        const iSubs = global.subscriptions;
        if (iSubs) {
            iSubs.forEach(unsubscribeFrom);
        }
        if (isTagComponent(support.templater)) {
            runBeforeDestroy(support, global);
        }
        const subTags = child.contexts;
        // recurse
        destroyContext(subTags, support);
    }
}
export function getChildTagsToSoftDestroy(childTags, tags = [], subs = []) {
    for (const child of childTags) {
        const global = child.global;
        if (!global) {
            continue;
        }
        const support = child.state.newest;
        if (support) {
            tags.push(support);
            const iSubs = global.subscriptions;
            if (iSubs) {
                subs.push(...iSubs);
            }
        }
        const subTags = child.contexts;
        if (subTags) {
            getChildTagsToSoftDestroy(subTags, tags, subs);
        }
    }
    return { tags, subs };
}
export function unsubscribeFrom(from) {
    from.unsubscribe();
}
//# sourceMappingURL=destroyContext.function.js.map