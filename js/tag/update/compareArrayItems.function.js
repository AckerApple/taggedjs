import { paintCommands, paintRemover } from '../../render/paint.function.js';
import { destroySupport } from '../../render/destroySupport.function.js';
export function compareArrayItems(value, index, lastArray, removed, counts) {
    const newLength = value.length - 1;
    const at = index - removed;
    const lessLength = at < 0 || newLength < at;
    const prevContext = lastArray[index];
    if (lessLength) {
        destroyArrayItem(prevContext, counts);
        return 1;
    }
    const oldKey = prevContext.value.arrayValue;
    const newValueTag = value[index];
    const result = runArrayItemDiff(oldKey, newValueTag, prevContext, counts, lastArray, index);
    return result;
}
function runArrayItemDiff(oldKey, newValueTag, prevContext, counts, lastArray, index) {
    const isDiff = newValueTag && oldKey !== newValueTag.arrayValue;
    if (isDiff) {
        destroyArrayItem(prevContext, counts);
        lastArray.splice(index, 1);
        return 2;
    }
    return 0;
}
export function destroyArrayItem(item, counts) {
    const global = item.global;
    destroyArrayItemByGlobal(global, item);
    ++counts.removed;
}
function destroyArrayItemByGlobal(global, item) {
    if (global) {
        const support = global.oldest;
        destroySupport(support, global);
    }
    else {
        const element = item.simpleValueElm;
        delete item.simpleValueElm;
        paintCommands.push({
            processor: paintRemover,
            args: [element],
        });
    }
}
//# sourceMappingURL=compareArrayItems.function.js.map