import { paint } from "../index.js";
import { blankHandler } from "../render/dom/attachDomElements.function.js";
import { paintAfters, painting } from "../render/paint.function.js";
import { syncStatesArray } from "../state/syncStates.function.js";
import { getSupportInCycle } from "./getSupportInCycle.function.js";
import { safeRenderSupport } from "./props/safeRenderSupport.function.js";
/** Used to call a function that belongs to a calling tag but is not with root arguments */
export function output(callback) {
    if (!callback) {
        return blankHandler; // output used on an argument that was not passed in
    }
    const support = getSupportInCycle();
    if (!support) {
        throw new Error('output must be used in render sync fashion');
    }
    return (...args) => {
        const ownerSupport = support.ownerSupport;
        return syncWrapCallback(args, callback, ownerSupport);
    };
}
export function syncWrapCallback(args, callback, ownerSupport) {
    const global = ownerSupport.context.global;
    const newestOwner = global.newest;
    // sync the new states to the old before the old does any processing
    syncStatesArray(newestOwner.states, ownerSupport.states);
    const c = callback(...args); // call the latest callback
    // sync the old states to the new
    syncStatesArray(ownerSupport.states, newestOwner.states);
    // now render the owner
    paintAfters.push([() => {
            const newGlobal = newestOwner.context.global;
            if (!newGlobal) {
                // paint()
                return; // its not a tag anymore
            }
            ++painting.locks;
            safeRenderSupport(newestOwner);
            // safeRenderSupport(global.newest)
            --painting.locks;
            paint();
        }, []]);
    return c;
}
//# sourceMappingURL=output.function.js.map