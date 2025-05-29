import { updateToDiffValue } from './updateToDiffValue.function.js';
/** Used for all tag value updates. Determines if value changed since last render */
export function forceUpdateExistingValue(contextItem, newValue, // newValue
ownerSupport, counts) {
    // Have the context check itself (avoid having to detect old value)
    const tagJsVar = contextItem.tagJsVar;
    const ignoreOrDestroyed = tagJsVar.checkValueChange(newValue, contextItem, counts);
    // ignore
    if (ignoreOrDestroyed === -1) {
        return; // do nothing
    }
    updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed, counts);
}
//# sourceMappingURL=forceUpdateExistingValue.function.js.map