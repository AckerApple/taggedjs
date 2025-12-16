import { checkStillSubscription } from './checkStillSubscription.function.js';
import { emitSubContext } from './processSubscribeWith.function.js';
export function processUpdateSubscribe(newValue, contextItem, ownerSupport) {
    const resultNum = checkStillSubscription(newValue, // subValue,
    contextItem, ownerSupport);
    if (contextItem.hasEmitted !== true) {
        const Observables = contextItem.value.Observables;
        if (!Observables) {
            return;
        }
        const Observable = Observables[0];
        // const subValue = Observable.value
        if (!('value' in Observable)) {
            return; // its never emitted
        }
    }
    if (resultNum === 0 && newValue.callback) {
        const subContext = contextItem.subContext;
        emitSubContext(newValue, subContext);
    }
}
//# sourceMappingURL=processUpdateSubscribe.function.js.map