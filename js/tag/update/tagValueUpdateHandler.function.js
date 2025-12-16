import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js';
/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(newValue, // newValue
contextItem, ownerSupport) {
    const tagJsType = contextItem.tagJsVar.tagJsType;
    const processUpdate = tagJsType && ['tag-conversion', 'element'].includes(tagJsType);
    if (processUpdate) {
        // calls processDesignElementUpdate
        contextItem.tagJsVar.processUpdate(newValue, contextItem, ownerSupport, []);
        contextItem.value = newValue;
        return 0;
    }
    // Do not continue if the value is just the same
    if (newValue === contextItem.value) {
        return 0;
    }
    ++contextItem.updateCount;
    return forceUpdateExistingValue(contextItem, newValue, ownerSupport);
}
//# sourceMappingURL=tagValueUpdateHandler.function.js.map