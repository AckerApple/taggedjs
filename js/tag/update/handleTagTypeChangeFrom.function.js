import { updateToDiffValue } from './updateToDiffValue.function.js';
/** used to handle when value was subscribe but now is something else */
export function handleTagTypeChangeFrom(originalType, newValue, ownerSupport, contextItem) {
    const isDifferent = !newValue || !newValue.tagJsType || newValue.tagJsType !== originalType;
    if (isDifferent) {
        const oldTagJsVar = contextItem.tagJsVar;
        oldTagJsVar.destroy(contextItem, ownerSupport);
        updateToDiffValue(newValue, contextItem, // subSubContext,
        ownerSupport, 99);
        return 99;
    }
}
//# sourceMappingURL=handleTagTypeChangeFrom.function.js.map