import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js';
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { tag } from '../TagJsTags/tag.function.js';
import { state } from './state.function.js';
/** Used for knowing when html elements have arrived on page */
export function onInit(callback) {
    state(() => {
        const result = callback();
        const nowSupport = getSupportInCycle();
        if (!nowSupport?.context?.global) {
            return result;
        }
        return checkToResolvePromise(result, nowSupport, {
            resolvePromise,
            resolveValue,
        });
    });
    return tag;
}
function resolvePromise(value) {
    return value;
}
function resolveValue(value) {
    return value;
}
//# sourceMappingURL=onInit.function.js.map