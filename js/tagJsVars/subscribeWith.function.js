import { blankHandler } from "../render/dom/blankHandler.function.js";
import { ValueTypes } from "../tag/index.js";
import { processSubscribeWith } from "../tag/update/processSubscribeWith.function.js";
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js";
import { processSubscribeWithAttribute } from "./processSubscribeWithAttribute.function.js";
/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function subscribeWith(Observable, withDefault, callback) {
    // const support = getSupportInCycle() as AnySupport
    // const context = getSupportWithState(support).context
    /*
    const context = getContextInCycle() as ContextItem
    const stateMeta = context.state as ContextStateMeta
    const newer = stateMeta.newer as ContextStateSupport
    */
    return {
        onOutput: blankHandler, // this gets set within setupSubscribe
        tagJsType: ValueTypes.subscribe,
        processInitAttribute: processSubscribeWithAttribute,
        processInit: processSubscribeWith,
        hasValueChanged: checkSubscribeValueChanged,
        // processUpdate: tagValueUpdateHandler,
        processUpdate: blankHandler,
        destroy: deleteAndUnsubscribe,
        callback,
        withDefault,
        // states: newer.states,
        Observables: [Observable],
    };
}
/** checks is a previous tag var was a subscription but now has changed */
export function checkSubscribeValueChanged(value, contextItem) {
    if (!value?.tagJsType) {
        return 1; // its not a subscription anymore
    }
    const newObserves = value.Observables;
    if (!newObserves) {
        return 2; // its not a subscription anymore
    }
    const oldValue = contextItem.value;
    const oldObserves = oldValue.Observables;
    if (!oldObserves || oldObserves.length !== newObserves.length) {
        return 3; // not the same subscription
    }
    const allMatch = newObserves.every((ob, index) => ob === oldObserves[index]);
    if (!allMatch) {
        return 4;
    }
    return 0; // still the same
}
//# sourceMappingURL=subscribeWith.function.js.map