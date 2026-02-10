import { destroySupport } from '../../../render/destroySupport.function.js';
import { castArrayItem } from './processTagArray.js';
/** 1 = destroyed, 2 = value changes, 0 = no change */
export function compareArrayItems(value, index, lastArray, removed) {
    const newLength = value.length - 1;
    const at = index - removed;
    const lessLength = at < 0 || newLength < at;
    const prevContext = lastArray[index];
    if (lessLength) {
        destroyArrayItem(prevContext);
        return 1;
    }
    if (prevContext.arrayValue === undefined) {
        prevContext.arrayValue = index;
    }
    // const oldKey = prevArrayValue.arrayValue === undefined ? index : prevArrayValue.arrayValue
    const oldKey = prevContext.arrayValue; // || prevContext.value.arrayValue
    const newValueTag = castArrayItem(value[index]);
    const result = runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index);
    return result;
}
function runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index) {
    const newKey = newValueTag.arrayValue || index;
    const isDiff = oldKey !== newKey;
    if (isDiff) {
        destroyArrayItem(prevContext);
        lastArray.splice(index, 1);
        return 2;
    }
    return 0;
}
export function destroyArrayItem(context) {
    const global = context.global;
    destroyArrayItemByGlobal(global, context);
}
function destroyArrayItemByGlobal(global, context) {
    if (global && context.state?.oldest) {
        const support = context.state.oldest;
        destroySupport(support, global);
        return;
    }
    context.tagJsVar.destroy(context, {});
}
//# sourceMappingURL=compareArrayItems.function.js.map