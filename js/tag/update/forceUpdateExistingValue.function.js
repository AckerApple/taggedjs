import { updateToDiffValue } from './updateToDiffValue.function.js';
/** Used for all tag value updates. Determines if value changed since last render */
export function forceUpdateExistingValue(contextItem, newValue, // newValue
ownerSupport) {
    // Have the context check itself (avoid having to detect old value)
    const ignoreOrDestroyed = contextItem.checkValueChange(newValue, contextItem);
    // ignore
    if (ignoreOrDestroyed === -1) {
        return; // do nothing
    }
    updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed);
}
//# sourceMappingURL=forceUpdateExistingValue.function.js.map