// taggedjs-no-compile
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js';
import { destroyArrayItem, runArrayItemDiff } from './compareArrayItems.function.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
import { enqueueBatchAfterUnique } from '../../../render/paint.function.js';
const notCasted = Symbol('not-casted');
const noArgs = [];
export function processTagArray(context, value, // arry of Tag classes
ownerSupport, appendTo) {
    const noPriorRun = context.lastArray === undefined;
    if (noPriorRun) {
        context.lastArray = [];
    }
    const lastArray = context.lastArray;
    let runtimeInsertBefore = context.placeholder;
    const length = value.length;
    const castedCache = new Array(length).fill(notCasted);
    const getCastedArrayItem = function getCastedArrayItem(index) {
        const cached = castedCache[index];
        if (cached !== notCasted) {
            return cached;
        }
        const casted = castArrayItem(value[index]);
        castedCache[index] = casted;
        return casted;
    };
    let batchUpdates = noPriorRun ? false : length !== lastArray.length;
    // ARRAY DELETES
    if (!noPriorRun) {
        // on each loop check the new length
        const results = runArrayDeleteCheck(lastArray, value, context, batchUpdates, getCastedArrayItem);
        batchUpdates = results.batchUpdates;
    }
    const liveArray = context.lastArray;
    for (let index = 0; index < length; ++index) {
        const newSubject = reviewArrayItem(index, liveArray, ownerSupport, batchUpdates, getCastedArrayItem, runtimeInsertBefore, appendTo);
        runtimeInsertBefore = newSubject.placeholder;
    }
}
function runArrayDeleteCheck(lastArray, value, contextItem, batchUpdates, getCastedArrayItem) {
    /** 🗑️ remove previous items first */
    const filteredLast = [];
    let removed = 0;
    const maxIndex = value.length - 1;
    for (let index = 0; index < lastArray.length; ++index) {
        const item = lastArray[index];
        if (item.locked === 1) {
            batchUpdates = true; // The item we are looking to update caused the render we are under
        }
        if (item.value === null) {
            filteredLast.push(item);
            continue;
        }
        // 👁️ COMPARE & REMOVE
        const newRemoved = compareArrayItems(index, lastArray, removed, maxIndex, getCastedArrayItem);
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
    return { batchUpdates };
}
/** new and old array items processed here */
function reviewArrayItem(index, lastArray, ownerSupport, batchUpdates, getCastedArrayItem, runtimeInsertBefore, // used during updates
appendTo) {
    const item = getCastedArrayItem(index);
    const previousContext = lastArray[index];
    if (previousContext) {
        return reviewPreviousArrayItem(item, previousContext, ownerSupport, batchUpdates, runtimeInsertBefore, appendTo);
    }
    // 🆕 NEW Array items processed below
    const context = createAndProcessContextItem(item, ownerSupport, lastArray, // acts as contexts aka Context[]
    runtimeInsertBefore, appendTo);
    // Added to previous array
    lastArray.push(context);
    if (item) {
        // set or use key()
        // context.arrayValue = item?.arrayValue || context.arrayValue || context.value
        context.arrayValue = item.arrayValue || context.arrayValue;
    }
    return context;
}
function reviewPreviousArrayItem(value, context, ownerSupport, batchUpdates, // delay render
_runtimeInsertBefore, // used during updates
_appendTo) {
    if (batchUpdates) {
        enqueueBatchAfterUnique(context, [runArrayBatchAfterHandler, [value, context, ownerSupport]]);
        context.value = value;
        return context;
    }
    // array item returned array
    if (Array.isArray(value)) {
        context.tagJsVar.processUpdate(value, context, ownerSupport, noArgs);
        context.value = value;
        return context;
    }
    const tagValueUpdateResult = tagValueUpdateHandler(value, context, ownerSupport);
    return context;
}
/** Run within first array processing loop
 *  1 = destroyed, 2 = value changes, 0 = no change */
function compareArrayItems(index, lastArray, removed, maxIndex, getCastedArrayItem) {
    const at = index - removed;
    const lessLength = at < 0 || maxIndex < at;
    const prevContext = lastArray[index];
    if (lessLength) {
        destroyArrayItem(prevContext);
        return 1;
    }
    if (prevContext.arrayValue === undefined) {
        prevContext.arrayValue = index;
    }
    const oldKey = prevContext.arrayValue;
    const newValueTag = getCastedArrayItem(index);
    const result = runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index);
    return result;
}
function runArrayBatchAfterHandler(value, context, ownerSupport) {
    tagValueUpdateHandler(value, context, ownerSupport);
}
// For when an item in the array is a function
export function castArrayItem(item) {
    if (typeof item !== 'function') {
        return item;
    }
    const callable = item;
    if (callable.tagJsType !== undefined) {
        return item;
    }
    return callable();
}
//# sourceMappingURL=processTagArray.js.map