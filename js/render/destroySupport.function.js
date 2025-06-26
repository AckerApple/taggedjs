import { destroyContext } from '../tag/destroyContext.function.js';
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js';
import { runBeforeDestroy } from '../tag/tagRunner.js';
export function destroySupport(support, global) {
    const subject = support.context;
    global.deleted = true;
    subject.renderCount = 0; // if it comes back, wont be considered an update
    const promises = [];
    const context = global.contexts;
    destroyContext(context, support);
    if (global.destroy$) {
        runBeforeDestroy(support, global);
    }
    smartRemoveKids(global, promises);
    return promises;
}
//# sourceMappingURL=destroySupport.function.js.map