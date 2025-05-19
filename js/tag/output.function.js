import { blankHandler } from "../render/dom/attachDomElements.function.js";
import { syncStatesArray } from "../state/syncStates.function.js";
import { getSupportInCycle } from "./getSupportInCycle.function.js";
import { safeRenderSupport } from "./props/alterProp.function.js";
/** Used to call a function that belongs to a calling tag */
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
        const ownerGlobal = ownerSupport.subject.global;
        const newestOwner = ownerGlobal.newest;
        // sync the new states to the old before the old does any processing
        syncStatesArray(newestOwner.states, ownerSupport.states);
        const c = callback(...args); // call the latest callback
        // sync the old states to the new
        syncStatesArray(ownerSupport.states, newestOwner.states);
        // now render the owner
        const newestOwnerOwner = newestOwner.ownerSupport;
        safeRenderSupport(newestOwner, newestOwnerOwner.subject.global.newest);
        return c;
    };
}
//# sourceMappingURL=output.function.js.map