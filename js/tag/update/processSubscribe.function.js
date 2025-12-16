import { setupSubscribe } from './setupSubscribe.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
export function processSubscribeWith(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    const subContext = setupSubscribe(value, contextItem, ownerSupport, counts, appendTo, insertBefore);
    if (!subContext.hasEmitted) {
        emitSubContext(value, subContext);
    }
    return subContext;
}
export function emitSubContext(value, subContext) {
    const observables = value.Observables;
    const obValue = observables[0]?.value;
    subContext.valueHandler((obValue || value.withDefault), 0);
}
export function processSignal(value, contextItem, ownerSupport, counts, appendTo) {
    const subValue = {
        tagJsType: ValueTypes.subscribe,
        states: [],
        Observables: [value],
    };
    setupSubscribe(subValue, contextItem, ownerSupport, counts, appendTo);
}
//# sourceMappingURL=processSubscribe.function.js.map