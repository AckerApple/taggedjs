// taggedjs-no-compile
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js';
import { compareArrayItems } from './compareArrayItems.function.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
export function processTagArray(contextItem, value, // arry of Tag classes
ownerSupport, appendTo) {
    const noLast = contextItem.lastArray === undefined;
    if (noLast) {
        contextItem.lastArray = [];
    }
    const lastArray = contextItem.lastArray;
    let runtimeInsertBefore = contextItem.placeholder;
    let removed = 0;
    /** 🗑️ remove previous items first */
    const filteredLast = [];
    // if not first time, then check for deletes
    if (!noLast) {
        // on each loop check the new length
        for (let index = 0; index < lastArray.length; ++index) {
            const item = lastArray[index];
            // .key() was not used
            if (item.value === null) {
                filteredLast.push(item);
                continue;
            }
            // 👁️ COMPARE & REMOVE
            const newRemoved = compareArrayItems(value, index, lastArray, removed);
            if (newRemoved === 0) {
                filteredLast.push(item);
                continue;
            }
            // do the same number again because it was a mid delete
            if (newRemoved === 2) {
                index = index - 1;
                continue;
            }
            removed = removed + newRemoved;
        }
        contextItem.lastArray = filteredLast;
    }
    const length = value.length;
    for (let index = 0; index < length; ++index) {
        const newSubject = reviewArrayItem(value, index, contextItem.lastArray, ownerSupport, runtimeInsertBefore, appendTo);
        runtimeInsertBefore = newSubject.placeholder;
    }
}
/** new and old array items processed here */
function reviewArrayItem(array, index, lastArray, ownerSupport, runtimeInsertBefore, // used during updates
appendTo) {
    const item = castArrayItem(array[index]);
    const previousContext = lastArray[index];
    if (previousContext) {
        return reviewPreviousArrayItem(item, previousContext, lastArray, ownerSupport, index, runtimeInsertBefore, appendTo);
    }
    const contextItem = createAndProcessContextItem(item, ownerSupport, lastArray, // acts as contexts aka Context[]
    runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    if (item) {
        contextItem.arrayValue = item?.arrayValue || contextItem.arrayValue || index;
    }
    return contextItem;
}
function reviewPreviousArrayItem(value, context, lastArray, ownerSupport, index, runtimeInsertBefore, // used during updates
appendTo) {
    const couldBeSame = lastArray.length > index;
    if (couldBeSame) {
        if (Array.isArray(value)) {
            context.tagJsVar.processUpdate(value, context, ownerSupport, []);
            context.value = value;
            return context;
        }
        tagValueUpdateHandler(value, context, ownerSupport);
        return context;
    }
    // NEW REPLACEMENT
    const contextItem = createAndProcessContextItem(value, ownerSupport, lastArray, runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    return contextItem;
}
export function castArrayItem(item) {
    const isBasicFun = typeof item === 'function' && item.tagJsType === undefined;
    if (isBasicFun) {
        const fun = item;
        item = fun();
    }
    return item;
}
//# sourceMappingURL=processTagArray.js.map