// taggedjs-no-compile
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js';
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
function reviewArrayItem(array, index, lastArray, ownerSupport, runtimeInsertBefore, // used during updates
appendTo) {
    const item = array[index];
    const previous = lastArray[index];
    if (previous) {
        return reviewPreviousArrayItem(item, previous, lastArray, ownerSupport, index, runtimeInsertBefore, appendTo);
    }
    const contextItem = createAndProcessContextItem(item, ownerSupport, lastArray, runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    return contextItem;
}
function reviewPreviousArrayItem(value, itemSubject, lastArray, ownerSupport, index, runtimeInsertBefore, // used during updates
appendTo) {
    const couldBeSame = lastArray.length > index;
    if (couldBeSame) {
        tagValueUpdateHandler(value, itemSubject, ownerSupport);
        return itemSubject;
    }
    const contextItem = createAndProcessContextItem(value, ownerSupport, lastArray, runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    return contextItem;
}
//# sourceMappingURL=processTagArray.js.map