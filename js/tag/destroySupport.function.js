import { getChildTagsToDestroy } from './getChildTagsToDestroy.function.js';
import { smartRemoveKids } from './smartRemoveKids.function.js';
import { runBeforeDestroy } from './tagRunner.js';
export function destroySupport(support) {
    const global = support.subject.global;
    global.deleted = true;
    support.subject.renderCount = 0; // if it comes back, wont be considered an update
    const promises = [];
    const context = global.context;
    getChildTagsToDestroy(context);
    if (global.destroy$) {
        runBeforeDestroy(support);
    }
    smartRemoveKids(support, promises);
    return promises;
}
//# sourceMappingURL=destroySupport.function.js.map