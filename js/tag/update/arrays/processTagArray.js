// taggedjs-no-compile
import { tagValueUpdateHandler } from '../tagValueUpdateHandler.function.js';
import { destroyArrayItem } from './compareArrayItems.function.js';
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
    const batchUpdates = !noPriorRun && (length !== lastArray.length ||
        lastArray.some(item => item.locked === 1));
    const liveArray = noPriorRun
        ? lastArray
        : reconcileArrayContexts(lastArray, length, getCastedArrayItem);
    context.lastArray = liveArray;
    for (let index = 0; index < length; ++index) {
        const insertBefore = findNextArrayStartMarker(liveArray, index + 1) || context.placeholder;
        reviewArrayItem(index, liveArray, ownerSupport, batchUpdates, getCastedArrayItem, insertBefore, appendTo);
    }
}
function findNextArrayStartMarker(contexts, fromIndex) {
    for (let index = fromIndex; index < contexts.length; ++index) {
        const marker = contexts[index]?.arrayStartMarker;
        if (marker) {
            return marker;
        }
    }
}
function reconcileArrayContexts(lastArray, newLength, getCastedArrayItem) {
    const nextArray = new Array(newLength);
    const usedContexts = new Set();
    const keyedContexts = new Map();
    for (let index = 0; index < lastArray.length; ++index) {
        const context = lastArray[index];
        const key = getContextKey(context);
        if (key === undefined) {
            continue;
        }
        const matches = keyedContexts.get(key);
        if (matches) {
            matches.push(context);
        }
        else {
            keyedContexts.set(key, [context]);
        }
    }
    // Explicit keys retain identity even when nullable siblings shift indices.
    for (let index = 0; index < newLength; ++index) {
        const key = getValueKey(getCastedArrayItem(index));
        if (key === undefined) {
            continue;
        }
        const matches = keyedContexts.get(key);
        const context = matches?.shift();
        if (context) {
            nextArray[index] = context;
            usedContexts.add(context);
        }
    }
    // Values without keys continue to use their array position as identity.
    for (let index = 0; index < newLength; ++index) {
        if (nextArray[index]) {
            continue;
        }
        const context = lastArray[index];
        const value = getCastedArrayItem(index);
        const contextKey = getContextKey(context);
        const valueKey = getValueKey(value);
        if (context &&
            !usedContexts.has(context) &&
            ((contextKey === undefined && valueKey === undefined) ||
                isEmptyValue(context.value) ||
                isEmptyValue(value))) {
            nextArray[index] = context;
            usedContexts.add(context);
        }
    }
    for (let index = 0; index < lastArray.length; ++index) {
        const context = lastArray[index];
        if (!usedContexts.has(context)) {
            destroyArrayItem(context);
        }
    }
    return nextArray;
}
function getContextKey(context) {
    return context?.arrayValue;
}
function getValueKey(value) {
    return value?.arrayValue;
}
function isEmptyValue(value) {
    return value === null || value === undefined;
}
/** new and old array items processed here */
function reviewArrayItem(index, lastArray, ownerSupport, batchUpdates, getCastedArrayItem, runtimeInsertBefore, // used during updates
appendTo) {
    const item = getCastedArrayItem(index);
    const previousContext = lastArray[index];
    if (previousContext) {
        const key = getValueKey(item);
        if (key === undefined) {
            delete previousContext.arrayValue;
        }
        else {
            previousContext.arrayValue = key;
        }
        return reviewPreviousArrayItem(item, previousContext, ownerSupport, batchUpdates && previousContext.locked !== 1, runtimeInsertBefore, appendTo);
    }
    // 🆕 NEW Array items processed below
    const context = createAndProcessContextItem(item, ownerSupport, lastArray, // acts as contexts aka Context[]
    runtimeInsertBefore, appendTo);
    lastArray[index] = context;
    const key = getValueKey(item);
    if (key !== undefined) {
        context.arrayValue = key;
    }
    return context;
}
function reviewPreviousArrayItem(value, context, ownerSupport, batchUpdates, // delay render
_runtimeInsertBefore, // used during updates
_appendTo) {
    if (batchUpdates) {
        enqueueBatchAfterUnique(context, [runArrayBatchAfterHandler, [value, context, ownerSupport]]);
        return context;
    }
    // array item returned array
    if (Array.isArray(value)) {
        context.tagJsVar.processUpdate(value, context, ownerSupport, noArgs);
        context.value = value;
        return context;
    }
    tagValueUpdateHandler(value, context, ownerSupport);
    return context;
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