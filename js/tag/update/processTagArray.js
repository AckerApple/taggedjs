// taggedjs-no-compile
import { ArrayNoKeyError } from '../../errors.js';
import { destroyArrayTag } from '../checkDestroyPrevious.function.js';
import { newSupportByTemplater, setupNewSupport, tagFakeTemplater } from './processTag.function.js';
import { Support } from '../Support.class.js';
import { isTagClass } from '../../isInstance.js';
import { renderTagOnly } from '../render/renderTagOnly.function.js';
import { TagJsSubject } from './TagJsSubject.class.js';
import { afterChildrenBuilt } from './processTag.function.js';
import { textNode } from '../textNode.js';
export function processTagArray(subject, value, // arry of Tag classes
insertBefore, // <template end interpolate />
ownerSupport, options, fragment) {
    const clones = ownerSupport.subject.global.clones; // []
    let lastArray = subject.lastArray = subject.lastArray || { array: [] };
    if (!subject.global.placeholder) {
        setPlaceholderElm(insertBefore, subject);
    }
    const runtimeInsertBefore = subject.global.placeholder;
    let removed = 0;
    /** 🗑️ remove previous items first */
    lastArray.array = lastArray.array.filter((item, index) => {
        const newLength = value.length - 1;
        const at = index - removed;
        const lessLength = newLength < at;
        if (lessLength) {
            destroyArrayItem(lastArray.array, index, options);
            ++removed;
            return false;
        }
        const subTag = value[index - removed];
        const tagClass = isTagClass(subTag);
        let tag = subTag;
        let templater = subTag.templater;
        let prevArrayValue;
        if (tagClass) {
            prevArrayValue = tag.arrayValue;
        }
        else {
            templater = subTag;
            tag = templater.tag;
            prevArrayValue = templater.arrayValue;
        }
        // const tag = subTag?.templater.tag as Tag
        const lastTag = item.support.templater.tag;
        const lastArrayValue = lastTag.arrayValue;
        const destroyItem = !areLikeValues(prevArrayValue, lastArrayValue);
        if (destroyItem) {
            destroyArrayItem(lastArray.array, index, options);
            ++removed;
            return false;
        }
        return true;
    });
    const length = value.length;
    for (let index = 0; index < length; ++index) {
        const item = value[index];
        const previous = lastArray.array[index];
        const previousSupport = previous?.support;
        const subTag = item;
        const tagClass = isTagClass(subTag);
        const itemSubject = previousSupport?.subject || new TagJsSubject(undefined);
        let templater = subTag.templater;
        let support;
        if (tagClass) {
            if (!templater) {
                templater = tagFakeTemplater(subTag);
            }
            support = new Support(templater, ownerSupport, itemSubject);
        }
        else {
            templater = subTag;
            support = setupNewTemplater(templater, ownerSupport, itemSubject);
        }
        // share global between old and new
        if (previousSupport) {
            const prevSubject = previousSupport.subject;
            const global = prevSubject.global;
            setupNewSupport(support, ownerSupport, prevSubject);
            support.subject.global = global;
            global.newest = support;
        }
        else {
            setupNewSupport(support, ownerSupport, itemSubject);
        }
        // check for html``.key()
        const tag = templater.tag || subTag;
        const keySet = 'arrayValue' in tag;
        if (!keySet) {
            const details = {
                // template: support.getTemplate().string,
                array: value,
            };
            const message = 'Use html`...`.key(item) instead of html`...` to template an Array';
            console.error(message, details);
            const err = new ArrayNoKeyError(message, details);
            throw err;
        }
        const couldBeSame = lastArray.array.length > index;
        if (couldBeSame) {
            const prevSupport = previous.support;
            const prevGlobal = prevSupport.subject.global;
            const oldest = prevGlobal.oldest;
            oldest.updateBy(support);
            continue;
        }
        processAddTagArrayItem(runtimeInsertBefore, support, index, options, lastArray.array, fragment);
        ownerSupport.subject.global.childTags.push(support);
    }
    return clones;
}
function setPlaceholderElm(insertBefore, subject) {
    const placeholder = subject.global.placeholder = textNode.cloneNode(false);
    const parentNode = insertBefore.parentNode;
    parentNode.insertBefore(placeholder, insertBefore);
    parentNode.removeChild(insertBefore);
}
function processAddTagArrayItem(before, support, index, options, lastArray, fragment) {
    const lastValue = {
        support, index
    };
    // Added to previous array
    lastArray.push(lastValue);
    const counts = {
        added: options.counts.added + index,
        removed: options.counts.removed,
    };
    // TODO: This might be causing double clones delete issues because all array items share same placeholder
    support.subject.global.placeholder = before; // newTempElm
    const newFragment = support.buildBeforeElement(undefined, { counts });
    const children = [...newFragment.children];
    const placeholder = before; // subject.global.placeholder as Text
    const parentNode = placeholder.parentNode;
    parentNode.insertBefore(newFragment, placeholder);
    afterChildrenBuilt(children, support.subject, support);
}
/** compare two values. If both values are arrays then the items will be compared */
function areLikeValues(valueA, valueB) {
    if (valueA === valueB) {
        return true;
    }
    const bothArrays = valueA instanceof Array && valueB instanceof Array;
    const matchLengths = bothArrays && valueA.length == valueB.length;
    if (matchLengths) {
        return valueA.every((item, index) => item === valueB[index]);
    }
    return false;
}
function setupNewTemplater(templater, ownerSupport, itemSubject) {
    const support = newSupportByTemplater(templater, ownerSupport, itemSubject);
    renderTagOnly(support, support, itemSubject, ownerSupport);
    return support;
}
function destroyArrayItem(lastArray, index, options) {
    const last = lastArray[index];
    const support = last.support;
    destroyArrayTag(support, options.counts);
    last.deleted = true;
    ++options.counts.removed;
}
//# sourceMappingURL=processTagArray.js.map