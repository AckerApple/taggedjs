import { ValueTypes } from '../ValueTypes.enum.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';
export function checkSubContext(newValue, ownerSupport, contextItem, _values, counts) {
    if (!newValue || !newValue.tagJsType || newValue.tagJsType !== ValueTypes.subscribe) {
        const tagJsVar = contextItem.tagJsVar;
        tagJsVar.delete(contextItem, ownerSupport);
        updateToDiffValue(newValue, contextItem, ownerSupport, 99, counts);
        return 99;
    }
    const subscription = contextItem.subContext;
    if (!subscription.hasEmitted) {
        return -1;
    }
    subscription.callback = newValue.callback;
    subscription.valueHandler(subscription.lastValue);
    return -1;
}
//# sourceMappingURL=checkSubContext.function.js.map