import { state } from './index.js';
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { processSignal } from '../tag/update/processSignal.function.js';
import { ValueTypes } from '../tag/ValueTypes.enum.js';
import { deleteAndUnsubscribe } from '../tag/update/setupSubscribe.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { checkSubscribeValueChanged } from '../TagJsTags/subscribeWith.function.js';
import { processUpdateSubscribe } from '../tag/update/processUpdateSubscribe.function.js';
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
    const emit = (newValue) => {
        // Notify all subscribers
        subscribers.forEach(callback => callback(newValue));
    };
    return {
        component: false,
        tagJsType: ValueTypes.signal,
        hasValueChanged: checkSubscribeValueChanged,
        processInitAttribute: blankHandler,
        processInit: processSignal,
        processUpdate: processUpdateSubscribe,
        get value() {
            return value;
        },
        set value(newValue) {
            if (value !== newValue) {
                value = newValue;
                emit(newValue);
            }
        },
        destroy: deleteAndUnsubscribe,
        emit,
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