import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js";
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js";
import { ValueTypes } from "../tag/index.js";
import { processSubscribeWith } from "../tag/update/processSubscribe.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function subscribeWith(Observable, withDefault, callback) {
    return {
        tagJsType: ValueTypes.subscribe,
        processInit: processSubscribeWith,
        Observable,
        callback,
        withDefault,
        states: getSupportWithState(getSupportInCycle()).states,
    };
}
//# sourceMappingURL=subscribeWith.function.js.map