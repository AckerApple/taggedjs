import { updateToDiffValue } from './updateToDiffValue.function.js';
/** Used for all tag value updates. Determines if value changed since last render */
export function forceUpdateExistingValue(contextItem, newValue, // newValue
ownerSupport) {
    // Have the context check itself (avoid having to detect old value)
    const TagJsTag = contextItem.tagJsVar;
    const ignoreOrDestroyed = TagJsTag.hasValueChanged(newValue, contextItem, ownerSupport);
    // ignore
    if (ignoreOrDestroyed === 0) {
        return ignoreOrDestroyed; // do nothing
    }
    updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed);
    return ignoreOrDestroyed;
}
//# sourceMappingURL=forceUpdateExistingValue.function.js.map