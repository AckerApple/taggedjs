import { runBeforeDestroy } from './tagRunner.js';
import { getChildTagsToDestroy } from './getChildTagsToDestroy.function.js';
import { smartRemoveKids } from './smartRemoveKids.function.js';
export function destroySupport(support, stagger) {
    const global = support.subject.global;
    global.deleted = true;
    const context = global.context;
    getChildTagsToDestroy(context);
    if (global.destroy$) {
        global.destroy$.next();
        runBeforeDestroy(support);
    }
    // first paint
    const promises = [];
    stagger = smartRemoveKids(support, promises, stagger);
    if (promises.length) {
        return Promise.all(promises).then(() => stagger);
    }
    return stagger;
}
//# sourceMappingURL=destroySupport.function.js.map