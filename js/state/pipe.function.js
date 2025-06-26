import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js";
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js";
import { ValueTypes } from "../tag/index.js";
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function pipe(Observables, callback) {
    return {
        tagJsType: ValueTypes.subscribe,
        processInit: processPipe,
        delete: deleteAndUnsubscribe,
        callback,
        states: getSupportWithState(getSupportInCycle()).states,
        // Observable: Observables[0],
        Observables,
    };
}
function processPipe(values, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    return setupSubscribe(values, contextItem, ownerSupport, counts, undefined, appendTo);
}
//# sourceMappingURL=pipe.function.js.map