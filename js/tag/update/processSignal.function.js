import { setupSubscribe } from './setupSubscribe.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
export function processSignal(value, contextItem, ownerSupport, _insertBefore, appendTo) {
    const subValue = {
        tagJsType: ValueTypes.subscribe,
        states: [],
        Observables: [value],
    };
    setupSubscribe(subValue, contextItem, ownerSupport, _insertBefore, appendTo);
}
//# sourceMappingURL=processSignal.function.js.map