import { resetSupport } from '../Support.class.js';
import { getChildTagsToDestroy } from '../destroy.support.js';
/** used when a tag swaps content returned */
export function softDestroySupport(lastSupport, options = { byParent: false, stagger: 0 }) {
    const global = lastSupport.subject.global;
    global.deleted = true;
    // global.context = {}
    global.context = [];
    const childTags = getChildTagsToDestroy(global.childTags);
    lastSupport.destroySubscriptions();
    childTags.forEach(child => {
        const subGlobal = child.subject.global;
        delete subGlobal.newest;
        subGlobal.deleted = true;
    });
    lastSupport.smartRemoveKids();
    lastSupport.subject.global.clones.length = 0; // tag maybe used for something else
    lastSupport.subject.global.childTags.length = 0; // tag maybe used for something else
    resetSupport(lastSupport);
    childTags.forEach(child => softDestroySupport(child, { byParent: true, stagger: 0 }));
}
//# sourceMappingURL=softDestroySupport.function.js.map