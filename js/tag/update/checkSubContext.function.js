import { ValueTypes } from '../ValueTypes.enum.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';
export function checkSubContext(newValue, ownerSupport, contextItem, values, counts) {
    const hasChanged = handleTagTypeChangeFrom(ValueTypes.subscribe, newValue, ownerSupport, contextItem, counts);
    if (hasChanged) {
        return hasChanged;
    }
    const subscription = contextItem.subContext;
    if (!subscription.hasEmitted) {
        return -1;
    }
    subscription.callback = newValue.callback;
    subscription.valuesHandler(subscription.lastValues);
    return -1;
}
export function handleTagTypeChangeFrom(originalType, newValue, ownerSupport, contextItem, counts) {
    if (!newValue || !newValue.tagJsType || newValue.tagJsType !== originalType) {
        const tagJsVar = contextItem.tagJsVar;
        tagJsVar.delete(contextItem, ownerSupport);
        updateToDiffValue(newValue, contextItem, ownerSupport, 99, counts);
        return 99;
    }
}
//# sourceMappingURL=checkSubContext.function.js.map