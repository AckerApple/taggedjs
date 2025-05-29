import { setupSubscribe } from './setupSubscribe.function.js';
export function processSubscribe(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    return setupSubscribe(value.Observable, contextItem, ownerSupport, counts, value.callback, appendTo, insertBefore);
}
export function processSubscribeWith(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    const observable = value.Observable;
    const subscription = setupSubscribe(observable, contextItem, ownerSupport, counts, value.callback, appendTo, insertBefore);
    if (!subscription.hasEmitted) {
        subscription.valueHandler((observable.value || value.withDefault));
    }
    return subscription;
}
export function processSignal(value, contextItem, ownerSupport, counts, appendTo) {
    setupSubscribe(value, contextItem, ownerSupport, counts, undefined, appendTo);
}
//# sourceMappingURL=processSubscribe.function.js.map