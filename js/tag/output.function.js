import { getContextInCycle, isPromise, paint } from "../index.js";
import { blankHandler } from "../render/dom/blankHandler.function.js";
import { paintAfters, painting } from "../render/paint.function.js";
import { safeRenderSupport } from "./props/safeRenderSupport.function.js";
import { findStateSupportUpContext } from "../interpolations/attributes/getSupportWithState.function.js";
import { removeContextInCycle, setContextInCycle } from "./cycles/setContextInCycle.function.js";
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
        const result = syncWrapCallback(args, callback, ownerSupport.context);
        return result;
    };
    newCallback.wrapped = true;
    return newCallback;
}
export function syncWrapCallback(args, callback, context) {
    setContextInCycle(context);
    const result = callback(...args); // call the latest callback
    return afterCallback(result, context);
}
function afterCallback(result, context) {
    const newestOwner = undefined;
    removeContextInCycle();
    const toPaint = () => {
        const newGlobal = context.global;
        const ignore = newGlobal === undefined || newGlobal.deleted === true;
        if (ignore) {
            ++painting.locks;
            const targetContext = context; // newestOwner.context
            targetContext.tagJsVar.processUpdate(targetContext.value, targetContext, newestOwner, []);
            --painting.locks;
            paint();
            return; // its not a tag anymore
        }
        ++painting.locks;
        safeRenderSupport(newestOwner);
        --painting.locks;
        paint();
    };
    if (isPromise(result)) {
        result.then(() => {
            paintAfters.push([toPaint, []]);
        });
    }
    paintAfters.push([toPaint, []]);
    return result;
}
//# sourceMappingURL=output.function.js.map