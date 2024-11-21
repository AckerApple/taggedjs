import { getChildTagsToDestroy } from './getChildTagsToDestroy.function.js';
import { smartRemoveKids } from './smartRemoveKids.function.js';
import { runBeforeDestroy } from './tagRunner.js';
export function destroySupport(support) {
    const global = support.subject.global;
    global.deleted = true;
    support.subject.renderCount = 0; // if it comes back, wont be considered an update
    const promises = [];
    const context = global.context;
    getChildTagsToDestroy(context, promises);
    if (global.destroy$) {
        global.destroy$.next();
        runBeforeDestroy(support);
    }
    if (promises.length) {
        return Promise.all(promises).then(() => smartRemoveKids(support));
    }
    smartRemoveKids(support);
}
//# sourceMappingURL=destroySupport.function.js.map