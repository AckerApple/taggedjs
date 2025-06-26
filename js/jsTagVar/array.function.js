import { signal } from '../index.js';
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export function array(initialValue = []) {
    const sig = signal(initialValue);
    ['push', 'pop', 'splice', 'shift', 'unshift'].forEach(action => {
        sig[action] = (...args) => sig.value[action](...args);
    });
    return sig;
}
//# sourceMappingURL=array.function.js.map