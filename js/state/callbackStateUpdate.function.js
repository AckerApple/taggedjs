import { renderSupport } from '../render/renderSupport.function.js';
import { isPromise } from '../isInstance.js';
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js';
export default function callbackStateUpdate(context, _oldStates, callback, ...args) {
    // NEWEST UPDATE OLDEST: ensure that the oldest has the latest values first
    //syncStatesArray(newestSupport.states, oldStates)
    // run the callback
    const maybePromise = callback(...args);
    const newestSupport = findStateSupportUpContext(context);
    // TODO: This if may not be ever doing anything
    if (!newestSupport) {
        return maybePromise;
    }
    // context.global && 
    if (newestSupport.context.global) {
        renderSupport(newestSupport); // TODO: remove with html``
    }
    else {
        const supContext = newestSupport.context;
        supContext.tagJsVar.processUpdate(supContext.value, supContext, newestSupport.ownerSupport, // ownerSupport,
        []);
    }
    if (isPromise(maybePromise)) {
        maybePromise.finally(() => {
            if (context.global) {
                renderSupport(newestSupport); // TODO: remove
            }
            else {
                const supContext = newestSupport.context;
                supContext.tagJsVar.processUpdate(supContext.value, supContext, newestSupport.ownerSupport, // ownerSupport,
                []);
            }
        });
    }
    return maybePromise;
}
//# sourceMappingURL=callbackStateUpdate.function.js.map