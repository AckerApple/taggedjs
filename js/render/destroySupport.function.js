import { destroyContexts } from '../tag/destroyContexts.function.js';
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js';
import { runBeforeDestroy } from '../tag/tagRunner.js';
export function destroySupport(support, global) {
    const context = support.context;
    global.deleted = true;
    context.renderCount = 0; // if it comes back, wont be considered an update
    const promises = [];
    const subContexts = context.contexts;
    destroyContexts(subContexts, support);
    // tag() only destroy
    if (support.templater.wrapper) {
        runBeforeDestroy(support, global);
    }
    smartRemoveKids(context, promises);
    delete context.state;
    delete context.contexts;
    delete context.returnValue;
    delete context.providers;
    return promises;
}
//# sourceMappingURL=destroySupport.function.js.map