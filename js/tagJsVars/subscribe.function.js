import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js";
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js";
import { ValueTypes } from "../tag/index.js";
import { processSubscribe } from "../tag/update/processSubscribe.function.js";
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js";
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe(Observable, callback) {
    return {
        tagJsType: ValueTypes.subscribe,
        processInit: processSubscribe,
        delete: deleteAndUnsubscribe,
        checkValueChange: function subscribeDoNothing() {
            console.debug('weird to be here');
            return -1;
        },
        Observable,
        callback,
        states: getSupportWithState(getSupportInCycle()).states,
    };
}
//# sourceMappingURL=subscribe.function.js.map