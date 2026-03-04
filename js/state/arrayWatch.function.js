import { getContextInCycle } from '../index.js';
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js';
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js';
import { Signal } from './signal.function.js';
/** Changes in supplied array will cause calling tag to render */
export function arrayWatch(initialValue = [], onChange) {
    const context = getContextInCycle();
    return firstSignal(Signal(initialValue), context, onChange);
}
function firstSignal(sig, context, onChange = () => undefined) {
    const editorNames = new Set(['push', 'pop', 'splice', 'shift', 'unshift']);
    const readerNames = new Set(['map', 'reduce', 'forEach', 'every', 'filter']);
    const editorWrappers = new Map();
    const readerWrappers = new Map();
    const render = () => {
        const support = findStateSupportUpContext(context);
        onChange(sig.value);
        renderTagUpdateArray([support]);
    };
    const emitAndRender = () => {
        sig.emit(sig.value);
        render();
    };
    const getEditorWrapper = (action) => {
        const existing = editorWrappers.get(action);
        if (existing) {
            return existing;
        }
        const wrapped = (...args) => {
            const result = sig.value[action](...args);
            emitAndRender();
            return result;
        };
        editorWrappers.set(action, wrapped);
        return wrapped;
    };
    const getReaderWrapper = (action) => {
        const existing = readerWrappers.get(action);
        if (existing) {
            return existing;
        }
        const wrapped = sig.value[action].bind(sig.value);
        readerWrappers.set(action, wrapped);
        return wrapped;
    };
    const resignal = new Proxy(sig, {
        get(target, prop) {
            if (isArrayIndex(prop)) {
                return sig.value[prop];
            }
            if (prop === 'length') {
                return sig.value.length;
            }
            if (typeof prop === 'string' && editorNames.has(prop)) {
                return getEditorWrapper(prop);
            }
            if (typeof prop === 'string' && readerNames.has(prop)) {
                return getReaderWrapper(prop);
            }
            return sig[prop];
        },
        set(target, prop, value) {
            if (isArrayIndex(prop)) { // array[index] setting
                sig.value[prop] = value;
                emitAndRender();
                return true;
            }
            if (prop === 'length') {
                sig.value.length = value;
                emitAndRender();
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
function isArrayIndex(prop) {
    if (typeof prop === 'number') {
        return Number.isInteger(prop) && prop >= 0;
    }
    if (typeof prop !== 'string' || prop === '') {
        return false;
    }
    const asNumber = Number(prop);
    return Number.isInteger(asNumber) && asNumber >= 0 && String(asNumber) === prop;
}
//# sourceMappingURL=arrayWatch.function.js.map