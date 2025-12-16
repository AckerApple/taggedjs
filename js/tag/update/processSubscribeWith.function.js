import { setupSubscribe } from './setupSubscribe.function.js';
export function processSubscribeWith(value, contextItem, ownerSupport, insertBefore, appendTo) {
    const subContext = setupSubscribe(value, contextItem, ownerSupport, insertBefore, appendTo);
    if (!subContext.hasEmitted) {
        emitSubContext(value, subContext);
    }
    return subContext;
}
export function emitSubContext(value, subContext) {
    const observables = value.Observables;
    const observable = observables[0];
    if (!subContext.hasEmitted) {
        if ('withDefault' in value) {
            subContext.subValueHandler(value.withDefault, 0);
            return;
        }
        if ('value' in observable) {
            subContext.subValueHandler(observable.value, 0);
            return;
        }
        return; // nothing to emit
    }
    const emitValue = subContext.lastValues[0].value;
    subContext.subValueHandler(emitValue, 0);
}
//# sourceMappingURL=processSubscribeWith.function.js.map