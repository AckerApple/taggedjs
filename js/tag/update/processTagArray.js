// taggedjs-no-compile
import { paintAppends, paintInsertBefores } from '../paint.function.js';
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js';
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js';
import { updateExistingValue } from './updateExistingValue.function.js';
import { processNewArrayValue } from './processNewValue.function.js';
import { compareArrayItems } from './compareArrayItems.function.js';
export function processTagArray(subject, value, // arry of Tag classes
ownerSupport, counts, appendTo) {
    if (!subject.lastArray) {
        subject.lastArray = [];
    }
    const lastArray = subject.lastArray;
    let runtimeInsertBefore = subject.placeholder;
    let removed = 0;
    /** 🗑️ remove previous items first */
    const filteredLast = [];
    for (let index = 0; index < lastArray.length; ++index) {
        const item = lastArray[index];
        // 👁️ COMPARE & REMOVE
        const newRemoved = compareArrayItems(item, value, index, lastArray, removed, counts);
        if (newRemoved === 0) {
            filteredLast.push(item);
            continue;
        }
        removed = removed + newRemoved;
        // do the same number again because it was a mid delete
        if (newRemoved === 2) {
            index = index - 1;
        }
    }
    subject.lastArray = filteredLast;
    // const eAppendTo = existed ? undefined : appendTo
    const eAppendTo = appendTo; // existed ? undefined : appendTo
    const length = value.length;
    for (let index = 0; index < length; ++index) {
        const newSubject = reviewArrayItem(value, index, filteredLast, ownerSupport, runtimeInsertBefore, counts, eAppendTo);
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
    return processAddTagArrayItem(item, runtimeInsertBefore, // thisInsert as any,
    ownerSupport, counts, lastArray, appendTo);
}
function reviewPreviousArrayItem(value, itemSubject, lastArray, ownerSupport, index, runtimeInsertBefore, // used during updates
counts, appendTo) {
    const couldBeSame = lastArray.length > index;
    if (couldBeSame) {
        updateExistingValue(itemSubject, value, ownerSupport);
        return itemSubject;
    }
    const result = processAddTagArrayItem(value, runtimeInsertBefore, // thisInsert as any,
    ownerSupport, counts, lastArray, appendTo);
    return result;
}
function processAddTagArrayItem(value, before, // used during updates
ownerSupport, counts, lastArray, appendTo) {
    const itemSubject = {
        value,
        checkValueChange: checkSimpleValueChange,
        withinOwnerElement: false, // TODO: we need to pass down depth so we can answer this truthfully
    };
    counts.added = counts.added + 1; // index
    const subPlaceholder = document.createTextNode('');
    itemSubject.placeholder = subPlaceholder;
    if (!appendTo) {
        paintInsertBefores.push({
            element: subPlaceholder,
            relative: before,
        });
    }
    processNewArrayValue(value, ownerSupport, itemSubject);
    processFirstSubjectValue(value, itemSubject, ownerSupport, counts, appendTo);
    // after processing
    itemSubject.value = value;
    // Added to previous array
    lastArray.push(itemSubject);
    if (appendTo) {
        paintAppends.push({
            element: subPlaceholder,
            relative: appendTo,
        });
    }
    return itemSubject;
}
//# sourceMappingURL=processTagArray.js.map