import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js";
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js";
import { checkSubContext, ValueTypes } from "../tag/index.js";
import { processSubscribe } from "../tag/update/processSubscribe.function.js";
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js";
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe(Observable, callback) {
    const support = getSupportInCycle();
    const states = support ? getSupportWithState(support).states : [];
    return {
        tagJsType: ValueTypes.subscribe,
        processInit: processSubscribe,
        processUpdate: checkSubContext,
        // processUpdate: tagValueUpdateHandler,
        // processUpdate: blankHandler,
        // checkValueChange: checkTagValueChange,
        delete: deleteAndUnsubscribe,
        callback,
        states,
        Observables: [Observable],
    };
}
//# sourceMappingURL=subscribe.function.js.map