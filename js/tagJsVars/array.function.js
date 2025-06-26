import { signal } from '../index.js';
/** returns a signal that contains an array but also supplies array methods */
export function array(initialValue = []) {
    const sig = signal(initialValue);
    ['push', 'pop', 'splice', 'shift', 'unshift'].forEach(action => {
        sig[action] = (...args) => {
            const result = sig.value[action](...args);
            sig.emit(sig.value);
            if (action === 'push') {
                console.log('pushing', args);
            }
            return result;
        };
    });
    Object.defineProperty(sig, 'length', {
        get() {
            return sig.value.length;
        },
        set(length) {
            sig.value.length = length;
            sig.emit(sig.value);
            return sig.value.length;
        },
    });
    console.log('sig', sig);
    return sig;
}
//# sourceMappingURL=array.function.js.map