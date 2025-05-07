// taggedjs-no-compile
import { updateExistingValue } from './updateExistingValue.function.js';
import { compareArrayItems } from './compareArrayItems.function.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js';
export function processTagArray(subject, value, // arry of Tag classes
ownerSupport, counts, appendTo) {
    const noLast = subject.lastArray === undefined;
    if (noLast) {
        subject.lastArray = [];
    }
    const lastArray = subject.lastArray;
    let runtimeInsertBefore = subject.placeholder;
    let removed = 0;
    /** 🗑️ remove previous items first */
    const filteredLast = [];
    // if not first time, then check for deletes
    if (!noLast) {
        // on each loop check the new length
        for (let index = 0; index < lastArray.length; ++index) {
            const item = lastArray[index];
            // 👁️ COMPARE & REMOVE
            const newRemoved = compareArrayItems(value, index, lastArray, removed, counts);
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
        subject.lastArray = filteredLast;
    }
    const length = value.length;
    for (let index = 0; index < length; ++index) {
        const newSubject = reviewArrayItem(value, index, subject.lastArray, ownerSupport, runtimeInsertBefore, counts, appendTo);
        runtimeInsertBefore = newSubject.placeholder;
    }
}
function reviewArrayItem(array, index, lastArray, ownerSupport, runtimeInsertBefore, // used during updates
counts, appendTo) {
    const item = array[index];
    const previous = lastArray[index];
    if (previous) {
        return reviewPreviousArrayItem(item, previous, lastArray, ownerSupport, index, runtimeInsertBefore, counts, appendTo);
    }
    const contextItem = createAndProcessContextItem(item, ownerSupport, counts, checkSimpleValueChange, runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    return contextItem;
}
function reviewPreviousArrayItem(value, itemSubject, lastArray, ownerSupport, index, runtimeInsertBefore, // used during updates
counts, appendTo) {
    const couldBeSame = lastArray.length > index;
    if (couldBeSame) {
        updateExistingValue(value, ownerSupport, itemSubject);
        return itemSubject;
    }
    const contextItem = createAndProcessContextItem(value, ownerSupport, counts, checkSimpleValueChange, runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(contextItem);
    return contextItem;
}
//# sourceMappingURL=processTagArray.js.map