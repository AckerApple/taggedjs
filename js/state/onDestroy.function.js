import { state } from "./state.function.js";
import { getContextInCycle } from "../tag/cycles/setContextInCycle.function.js";
import { tag } from "../tagJsVars/tag.function.js";
export function onDestroy(callback) {
    state(function stateDestroy() {
        const context = getContextInCycle();
        context.destroy$.toCallback(callback);
    });
    return tag;
}
//# sourceMappingURL=onDestroy.function.js.map