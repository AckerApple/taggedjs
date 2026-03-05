// taggedjs-no-compile
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js';
import { destroyArrayItem, runArrayItemDiff } from './compareArrayItems.function.js';
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js';
import { batchAfters } from '../../../render/paint.function.js';
export function processTagArray(contextItem, value, // arry of Tag classes
ownerSupport, appendTo) {
    const noPriorRun = contextItem.lastArray === undefined;
    if (noPriorRun) {
        contextItem.lastArray = [];
    }
    const lastArray = contextItem.lastArray;
    let runtimeInsertBefore = contextItem.placeholder;
    const length = value.length;
    const castedCache = new Array(length);
    const castedCacheSet = new Array(length);
    const getCastedArrayItem = function getCastedArrayItem(index) {
        if (castedCacheSet[index]) {
            return castedCache[index];
        }
        const casted = castArrayItem(value[index]);
        castedCache[index] = casted;
        castedCacheSet[index] = true;
        return casted;
    };
    let batchUpdates = noPriorRun ? false : length !== lastArray.length;
    // ARRAY DELETES
    if (!noPriorRun) {
        // on each loop check the new length
        const results = runArrayDeleteCheck(lastArray, value, contextItem, batchUpdates, getCastedArrayItem);
        batchUpdates = results.batchUpdates;
    }
    for (let index = 0; index < length; ++index) {
        const newSubject = reviewArrayItem(index, contextItem.lastArray, ownerSupport, batchUpdates, getCastedArrayItem, runtimeInsertBefore, appendTo);
        runtimeInsertBefore = newSubject.placeholder;
    }
}
function runArrayDeleteCheck(lastArray, value, contextItem, batchUpdates, getCastedArrayItem) {
    /** 🗑️ remove previous items first */
    const filteredLast = [];
    let removed = 0;
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
        const newRemoved = compareArrayItems(value, index, lastArray, removed, getCastedArrayItem);
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
    return { removed, batchUpdates };
}
/** new and old array items processed here */
function reviewArrayItem(index, lastArray, ownerSupport, batchUpdates, getCastedArrayItem, runtimeInsertBefore, // used during updates
appendTo) {
    const item = getCastedArrayItem(index);
    const previousContext = lastArray[index];
    if (previousContext) {
        return reviewPreviousArrayItem(item, previousContext, lastArray, ownerSupport, index, batchUpdates, runtimeInsertBefore, appendTo);
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
function reviewPreviousArrayItem(value, context, lastArray, ownerSupport, index, batchUpdates, // delay render
runtimeInsertBefore, // used during updates
appendTo) {
    if (batchUpdates) {
        batchAfters.push([function arrayBatchAfterHandler() {
                tagValueUpdateHandler(value, context, ownerSupport);
            }, []]);
        context.value = value;
        return context;
    }
    const couldBeSame = lastArray.length > index;
    if (couldBeSame) {
        // array item returned array
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
/** Run within first array processing loop
 *  1 = destroyed, 2 = value changes, 0 = no change */
function compareArrayItems(value, index, lastArray, removed, getCastedArrayItem) {
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
    const oldKey = prevContext.arrayValue;
    const newValueTag = getCastedArrayItem(index);
    const result = runArrayItemDiff(oldKey, newValueTag, prevContext, lastArray, index);
    return result;
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