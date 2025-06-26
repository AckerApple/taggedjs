import { thenResolveBy } from '../interpolations/attributes/checkToResolvePromise.function.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function useAwaits() {
    const nowSupport = getSupportInCycle();
    const controller = {
        add: Promise.resolve()
    };
    Object.defineProperty(controller, 'add', {
        set(x) {
            x.then(thenResolveBy(nowSupport, resolvePromise));
        },
    });
    return controller;
}
function resolvePromise(x) {
    return x;
}
//# sourceMappingURL=awaits.js.map