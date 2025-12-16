import { getSupportInCycle } from "../tag/cycles/getSupportInCycle.function.js";
import { state } from "./state.function.js";
export function onDestroy(callback) {
    state(function stateDestroy() {
        const support = getSupportInCycle();
        const global = support.context.global;
        global.destroy$.toCallback(callback);
    });
}
//# sourceMappingURL=onDestroy.js.map