import { destroySupport } from '../../../render/destroySupport.function.js';
export function runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index) {
    const keyValue = newValueTag.arrayValue;
    const newKey = keyValue || index;
    let isDiff = oldKey !== newKey;
    if (isDiff === false && keyValue === undefined) {
        const hasChanged = prevContext.tagJsVar.hasValueChanged(newValueTag, prevContext, undefined);
        if (hasChanged) {
            isDiff = true;
        }
    }
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