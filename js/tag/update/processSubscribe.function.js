import { setupSubscribe } from './setupSubscribe.function.js';
export function processSubscribe(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    return setupSubscribe(value.Observables, contextItem, ownerSupport, counts, value.callback, appendTo, insertBefore);
}
export function processSubscribeWith(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    const observables = value.Observables;
    const subscription = setupSubscribe(observables, contextItem, ownerSupport, counts, value.callback, appendTo, insertBefore);
    if (!subscription.hasEmitted) {
        const obValue = observables[0]?.value;
        subscription.valueHandler((obValue || value.withDefault), 0);
    }
    return subscription;
}
export function processSignal(value, contextItem, ownerSupport, counts, appendTo) {
    setupSubscribe([value], contextItem, ownerSupport, counts, undefined, appendTo);
}
//# sourceMappingURL=processSubscribe.function.js.map