import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { state } from './state.function.js';
/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function onInit(callback) {
    state(() => {
        const result = callback();
        const nowSupport = getSupportInCycle();
        return checkToResolvePromise(result, nowSupport, nowSupport.context.global, 'onInit', { resolvePromise, resolveValue });
    });
}
function resolvePromise(x) {
    return x;
}
function resolveValue(x) {
    return x;
}
//# sourceMappingURL=onInit.js.map