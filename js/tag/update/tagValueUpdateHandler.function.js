/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(newValue, // newValue
contextItem, ownerSupport) {
    // calls processDesignElementUpdate
    const result = contextItem.tagJsVar.processUpdate(newValue, contextItem, ownerSupport, []);
    contextItem.value = newValue;
    return result || 0;
}
//# sourceMappingURL=tagValueUpdateHandler.function.js.map