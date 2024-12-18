import { getCallbackValue } from './state.utils.js';
export function getStateValue(state) {
    const callback = state.callback;
    if (!callback) {
        return state.defaultValue;
    }
    const [value] = getCallbackValue(callback);
    return value;
}
//# sourceMappingURL=getStateValue.function.js.map