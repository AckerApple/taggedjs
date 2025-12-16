import { ValueTypes } from '../ValueTypes.enum.js';
import { handleTagTypeChangeFrom } from './handleTagTypeChangeFrom.function.js';
export function checkStillSubscription(newValue, contextItem, ownerSupport) {
    const subContext = contextItem.subContext;
    const hasChanged = handleTagTypeChangeFrom(ValueTypes.subscribe, newValue, ownerSupport, contextItem);
    if (hasChanged) {
        return hasChanged;
    }
    if (!subContext || !subContext.hasEmitted) {
        return 0;
    }
    subContext.tagJsVar = newValue;
    subContext.valuesHandler(subContext.lastValues, 0);
    return 0;
}
//# sourceMappingURL=checkStillSubscription.function.js.map