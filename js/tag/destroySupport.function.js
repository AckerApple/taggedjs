import { destroyContext } from './destroyContext.function.js';
import { smartRemoveKids } from './smartRemoveKids.function.js';
import { runBeforeDestroy } from './tagRunner.js';
export function destroySupport(support, global) {
    const subject = support.subject;
    global.deleted = true;
    subject.renderCount = 0; // if it comes back, wont be considered an update
    const promises = [];
    const context = global.context;
    destroyContext(context);
    if (global.destroy$) {
        runBeforeDestroy(support, global);
    }
    smartRemoveKids(global, promises);
    return promises;
}
//# sourceMappingURL=destroySupport.function.js.map