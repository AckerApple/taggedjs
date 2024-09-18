// taggedjs-no-compile
import { paintAppends, paintInsertBefores, paintRemoves } from '../paint.function.js';
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js';
import { checkSimpleValueChange } from '../checkDestroyPrevious.function.js';
import { updateExistingValue } from './updateExistingValue.function.js';
import { processNewArrayValue } from './processNewValue.function.js';
import { destroySupport } from '../destroySupport.function.js';
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
        const newRemoved = reviewLastArrayItem(item, value, index, lastArray, removed, counts);
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
    processFirstSubjectValue(value, itemSubject, ownerSupport, // support,
    counts, `rvp_${lastArray.length}_array`, appendTo);
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
export function destroyArrayItem(item, counts) {
    const global = item.global;
    if (global) {
        const support = global.oldest;
        global.deleted = true;
        destroySupport(support, counts.removed);
        global.deleted = true;
    }
    else {
        const element = item.simpleValueElm;
        delete item.simpleValueElm;
        paintRemoves.push(element);
    }
    ++counts.removed;
}
function reviewLastArrayItem(_subTag, // used to compare arrays
value, index, lastArray, removed, counts) {
    const newLength = value.length - 1;
    const at = index - removed;
    const lessLength = at < 0 || newLength < at;
    const prev = lastArray[index];
    if (lessLength) {
        destroyArrayItem(prev, counts);
        ++removed;
        return 1;
    }
    if (lastArray[index].value.arrayValue !== value[index].arrayValue) {
        destroyArrayItem(prev, counts);
        lastArray.splice(index, 1);
        ++removed;
        return 2;
    }
    /*
    const nowValue = getArrayValueByItem(subTag)
    const lastArrayValue = lastArray.array[index].arrayValue
    */
    // check for html``.key()
    /*
    const keySet = 'arrayValue' in tag
    if (!keySet) {
      const details = {
        array: value.map(item => item.values || item),
        vdom: (tag as any)?.support.templater.tag.dom,
        tag,
        lastArray: lastArray.array[index]
      }
      const message = 'Found Tag in array without key value, during array update. Be sure to use "html`...`.key(unique)" OR import TaggedJs "key" "key(unique).html = CustomTag(props)"'
      console.error(message, details)
      const err = new ArrayNoKeyError(message, details)
      throw err
    }
    */
    /*
    const destroyItem = nowValue !== lastArrayValue
    if(destroyItem) {
      destroyArrayItem(lastArray.array, index, counts)
      ++removed
      return 1
    }
    */
    return 0;
}
/*
function getArrayValueByItem(item: any) {
  return item?.arrayValue || item
}
*/
//# sourceMappingURL=processTagArray.js.map