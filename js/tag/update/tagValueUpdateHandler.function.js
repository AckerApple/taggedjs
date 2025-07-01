import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(newValue, // newValue
ownerSupport, contextItem, counts) {
    // Do not continue if the value is just the same
    if (newValue === contextItem.value) {
        return;
    }
    forceUpdateExistingValue(contextItem, newValue, ownerSupport, counts);
}
//# sourceMappingURL=tagValueUpdateHandler.function.js.map