import { state } from '../index.js';
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { Signal } from './signal.function.js';
/** returns a signal that contains an array and mocks acting like an array to support root array functionality */
export function array(initialValue = []) {
    const support = getSupportInCycle();
    if (support) {
        return state(() => firstSignal(Signal(initialValue)));
    }
    return firstSignal(Signal(initialValue));
}
function firstSignal(sig) {
    const editors = ['push', 'pop', 'splice', 'shift', 'unshift'];
    const readers = ['map', 'reduce', 'forEach', 'every'];
    const overwriteEmitter = (action) => {
        return resignal[action] = (...args) => {
            const result = sig.value[action](...args);
            sig.emit(sig.value);
            return result;
        };
    };
    const resignal = new Proxy(sig, {
        get(target, prop) {
            // If accessing numeric index like '0', '1', etc.
            if (!isNaN(prop)) {
                return sig.value[prop];
            }
            if (prop === 'length') {
                return sig.value.length;
            }
            if (editors.includes(prop)) {
                return overwriteEmitter(prop);
                // return sig.value[prop]
            }
            if (readers.includes(prop)) {
                return sig.value[prop].bind(sig.value);
            }
            return sig[prop];
        },
        set(target, prop, value) {
            if (!isNaN(prop)) {
                sig.value[prop] = value;
                sig.emit(sig.value);
                return true;
            }
            if (prop === 'length') {
                sig.value.length = value;
                sig.emit(sig.value);
                return true;
            }
            // Applies to the signal and not the signal.value array
            ;
            sig[prop] = value;
            return true;
        }
    });
    return resignal;
}
//# sourceMappingURL=array.function.js.map