import { getContextInCycle, paint } from "../index.js";
import { blankHandler } from "../render/dom/blankHandler.function.js";
import { paintAfters, painting } from "../render/paint.function.js";
import { syncStatesArray } from "../state/syncStates.function.js";
import { safeRenderSupport } from "./props/safeRenderSupport.function.js";
import { findStateSupportUpContext } from "../interpolations/attributes/getSupportWithState.function.js";
/** Used to call a function that belongs to a calling tag but is not with root arguments */
export function output(callback) {
    if (!callback) {
        return blankHandler; // output used on an argument that was not passed in
    }
    const context = getContextInCycle();
    // const support = getSupportWithState(context)
    // const parentContext = context?.parentContext
    if (!context) {
        throw new Error('output must be used in render sync with a parent context');
    }
    const support = findStateSupportUpContext(context);
    // const support = getSupportInCycle() as AnySupport
    if (!support) {
        throw new Error('output must be used in render sync fashion');
    }
    if (callback.wrapped === true) {
        return callback;
    }
    const newCallback = (...args) => {
        const ownerSupport = support.ownerSupport;
        return syncWrapCallback(args, callback, ownerSupport.context);
    };
    newCallback.wrapped = true;
    return newCallback;
}
export function syncWrapCallback(args, callback, context) {
    const stateMeta = context.state;
    const newerStates = stateMeta.newer.states;
    const olderStates = stateMeta.older ? stateMeta.older.states : newerStates;
    const newestOwner = stateMeta.newest;
    // sync the new states to the old before the old does any processing
    syncStatesArray(newerStates, olderStates);
    const c = callback(...args); // call the latest callback
    // sync the old states to the new
    syncStatesArray(olderStates, newerStates);
    // now render the owner
    paintAfters.push([() => {
            const newGlobal = newestOwner.context.global;
            const ignore = newGlobal === undefined || newGlobal.deleted === true;
            if (ignore) {
                ++painting.locks;
                newestOwner.context.tagJsVar.processUpdate(newestOwner.context.value, newestOwner.context, newestOwner, []);
                --painting.locks;
                paint();
                return; // its not a tag anymore
            }
            ++painting.locks;
            safeRenderSupport(newestOwner);
            --painting.locks;
            paint();
        }, []]);
    return c;
}
//# sourceMappingURL=output.function.js.map