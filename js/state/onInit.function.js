import { tag } from '../index.js';
import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js';
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
import { state } from './state.function.js';
/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function onInit(callback) {
    state(() => {
        const result = callback();
        const context = getContextInCycle();
        if (context.global) {
            const nowSupport = getSupportInCycle();
            return checkToResolvePromise(result, nowSupport, { resolvePromise, resolveValue });
        }
    });
    return tag;
}
function resolvePromise(x) {
    return x;
}
function resolveValue(x) {
    return x;
}
//# sourceMappingURL=onInit.function.js.map