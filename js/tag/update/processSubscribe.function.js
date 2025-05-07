import { setupSubscribe } from './setupSubscribe.function.js';
export function processSubscribe(value, contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo, insertBefore) {
    return setupSubscribe(value.Observable, contextItem, ownerSupport, counts, value.callback, appendTo, insertBefore);
}
export function processSignal(value, contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo) {
    setupSubscribe(value, contextItem, ownerSupport, counts, undefined, appendTo);
}
//# sourceMappingURL=processSubscribe.function.js.map