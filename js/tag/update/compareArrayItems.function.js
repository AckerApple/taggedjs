import { paintRemoves } from '../paint.function.js';
import { destroySupport } from '../destroySupport.function.js';
export function compareArrayItems(value, index, lastArray, removed, counts) {
    const newLength = value.length - 1;
    const at = index - removed;
    const lessLength = at < 0 || newLength < at;
    const prevContext = lastArray[index].context;
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
        // Intended to protect an array from adding and then immediately deleting
        /*
        // TODO: Does this code protect bad array keying?
        if(prevContext.renderCount === 0) {
          const newKey = newValueTag.arrayValue
          console.warn('Possible array issue. Array is attempting to create/delete same items. Either html``.key is not unique or array changes with every render', {
            oldKey,
            newKey,
            
            prevValue: prevContext.value,
            prevContext,
          })
    
          paintAfters.push(() => {
            destroyArrayItemByGlobal(prevContext.global, prevContext)
            paintAfters.shift() // prevent endless recursion
            paint()
          })
    
          return 1
        }
        */
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