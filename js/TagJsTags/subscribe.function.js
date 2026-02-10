import { ValueTypes } from "../tag/index.js";
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js";
import { checkSubscribeValueChanged } from "./subscribeWith.function.js";
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js";
import { blankHandler } from "../render/dom/blankHandler.function.js";
import { checkStillSubscription } from "../tag/update/checkStillSubscription.function.js";
import { Subject } from "../index.js";
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe(Observable, callback) {
    return {
        component: false,
        onOutput: blankHandler, // gets set within setupSubscribe()
        tagJsType: ValueTypes.subscribe,
        processInitAttribute: processSubscribeAttribute,
        processInit: setupSubscribe,
        hasValueChanged: checkSubscribeValueChanged,
        processUpdate: checkStillSubscription,
        // processUpdate: processUpdateSubscribe,
        destroy: deleteAndUnsubscribe,
        callback,
        // states,
        Observables: [Observable],
    };
}
subscribe.all = subscribeAll;
function subscribeAll(subjects, callback) {
    return subscribe(Subject.all(subjects), callback);
}
//# sourceMappingURL=subscribe.function.js.map