import { blankHandler } from "../render/dom/blankHandler.function.js";
import { ValueTypes } from "../tag/index.js";
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js";
import { checkSubscribeValueChanged } from "./subscribeWith.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function pipe(Observables, callback) {
    /*
    const support = getSupportInCycle() as AnySupport
    const context = getSupportWithState(support).context
    const stateMeta = context.state as ContextStateMeta
    const newer = stateMeta.newer as ContextStateSupport
    */
    return {
        onOutput: blankHandler, // gets set within setupSubscribe()
        tagJsType: ValueTypes.subscribe,
        processInitAttribute: blankHandler,
        hasValueChanged: checkSubscribeValueChanged,
        processInit: processPipe,
        processUpdate: blankHandler,
        destroy: deleteAndUnsubscribe,
        callback,
        // states: newer.states,
        Observables,
    };
}
function processPipe(values, contextItem, ownerSupport, _insertBefore, appendTo) {
    const subValue = {
        tagJsType: ValueTypes.subscribe,
        states: [],
        Observables: values,
    };
    return setupSubscribe(subValue, contextItem, ownerSupport, undefined, appendTo);
}
//# sourceMappingURL=pipe.function.js.map