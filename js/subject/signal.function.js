import { state } from '../state/index.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { processSignal } from '../tag/update/processSubscribe.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export function signal(initialValue) {
    const support = getSupportInCycle();
    if (support) {
        return state(() => Signal(initialValue));
    }
    return Signal(initialValue);
}
/** Creates object with "value" key and ability to "subscribe" to value changes */
export function Signal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    return {
        tagJsType: ValueTypes.signal,
        processInit: processSignal,
        get value() {
            return value;
        },
        set value(newValue) {
            if (value !== newValue) {
                value = newValue;
                // Notify all subscribers
                subscribers.forEach(callback => callback(newValue));
            }
        },
        subscribe(callback) {
            callback(value); // emit initial value
            subscribers.add(callback);
            // Return an unsubscribe function
            const unsub = () => subscribers.delete(callback);
            // support traditional unsubscribe
            unsub.unsubscribe = unsub;
            return unsub;
        },
    };
}
//# sourceMappingURL=signal.function.js.map