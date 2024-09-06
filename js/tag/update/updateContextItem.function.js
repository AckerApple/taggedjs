import { updateExistingValue } from './updateExistingValue.function.js';
/** return boolean indicated if render took place */
export function updateContextItem(contextItem, value, ownerSupport, valueType) {
    contextItem.global.nowValueType = valueType;
    // listeners will evaluate updated values to possibly update display(s)
    const result = updateExistingValue(contextItem, value, ownerSupport).rendered;
    updateOneContextValue(value, contextItem);
    return result;
}
export function updateOneContextValue(value, contextItem) {
    contextItem.value = value;
    contextItem.global.lastValue = value;
}
//# sourceMappingURL=updateContextItem.function.js.map