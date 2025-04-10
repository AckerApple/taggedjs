import { paint, paintAfters, paintRemoves } from '../paint.function.js';
import { destroySupport } from '../destroySupport.function.js';
export function compareArrayItems(_subTag, // used to compare arrays
value, index, lastArray, removed, counts) {
    const newLength = value.length - 1;
    const at = index - removed;
    const lessLength = at < 0 || newLength < at;
    const prevContext = lastArray[index];
    if (lessLength) {
        destroyArrayItem(prevContext, counts);
        return 1;
    }
    const oldKey = lastArray[index].value.arrayValue;
    const newKey = value[index].arrayValue;
    if (oldKey !== newKey) {
        if (prevContext.renderCount === 0) {
            console.warn('Possible array key indexing issue. Array is attempting to both create and delete same items', {
                oldKey,
                newKey,
            });
            paintAfters.push(() => {
                destroyArrayItemByGlobal(prevContext.global, prevContext);
                paintAfters.shift(); // prevent endless recursion
                paint();
            });
            return 1;
        }
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
        destroySupport(support);
    }
    else {
        const element = item.simpleValueElm;
        delete item.simpleValueElm;
        paintRemoves.push(element);
    }
}
//# sourceMappingURL=compareArrayItems.function.js.map