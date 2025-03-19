import { getFakeTemplater, newSupportByTemplater, processTag } from './processTag.function.js';
import { processNowRegularValue } from './processRegularValue.function.js';
import { processReplacementComponent } from './processFirstSubjectComponent.function.js';
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js';
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js';
import { updateSupportBy } from '../updateSupportBy.function.js';
import { isArray, isTagComponent } from '../../isInstance.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { processTagArray } from './processTagArray.js';
import { getSupport } from '../getSupport.function.js';
const fooCounts = { added: 0, removed: 0 };
/** Used for all tag value updates. Determines if value changed since last render */
export function updateExistingValue(contextItem, newValue, // newValue
ownerSupport) {
    // Do not continue if the value is just the same
    if (newValue === contextItem.value) {
        return;
    }
    // Have the context check itself (avoid having to detect old value)
    const ignoreOrDestroyed = contextItem.checkValueChange(newValue, contextItem);
    // ignore
    if (ignoreOrDestroyed === -1) {
        return; // do nothing
    }
    // is new value a tag?
    const tagJsType = newValue && newValue.tagJsType;
    if (tagJsType) {
        if (tagJsType === ValueTypes.renderOnce) {
            return;
        }
        tryUpdateToTag(contextItem, newValue, ownerSupport);
        return;
    }
    if (isArray(newValue)) {
        processTagArray(contextItem, newValue, ownerSupport, { added: 0, removed: 0 });
        return;
    }
    if (typeof (newValue) === BasicTypes.function) {
        contextItem.value = newValue; // do not render functions that are not explicity defined as tag html processing
        return;
    }
    if (ignoreOrDestroyed) {
        processNowRegularValue(newValue, contextItem);
    }
}
function updateToTag(value, contextItem, ownerSupport) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        templater = getFakeTemplater();
        tag.templater = templater;
        templater.tag = tag;
    }
    const nowGlobal = (contextItem.global ? contextItem.global : getNewGlobal(contextItem));
    nowGlobal.newest = newSupportByTemplater(templater, ownerSupport, contextItem);
    processTag(ownerSupport, contextItem, fooCounts);
}
function handleStillTag(lastSupport, subject, value, ownerSupport) {
    const templater = value.templater || value;
    const valueSupport = getSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const lastSubject = lastSupport.subject;
    const newGlobal = lastSubject.global;
    const oldest = newGlobal.oldest;
    updateSupportBy(oldest, valueSupport);
}
export function prepareUpdateToComponent(templater, contextItem, ownerSupport) {
    const global = contextItem.global;
    // When last value was not a component
    if (!global.newest) {
        processReplacementComponent(templater, contextItem, ownerSupport, { added: 0, removed: 0 });
        return;
    }
    const support = getSupport(templater, ownerSupport, ownerSupport.appSupport, contextItem);
    updateExistingTagComponent(ownerSupport, support, // latest value
    contextItem);
}
export function updateContextItemBySupport(support, contextItem, value, ownerSupport) {
    if (typeof (value) === BasicTypes.function) {
        return;
    }
    handleStillTag(support, contextItem, value, ownerSupport);
    return;
}
/** result is an indication to ignore further processing but that does not seem in use anymore */
export function tryUpdateToTag(contextItem, newValue, // newValue
ownerSupport) {
    const tagJsType = newValue.tagJsType;
    const isComp = isTagComponent(newValue);
    if (isComp) {
        if (contextItem.global === undefined) {
            getNewGlobal(contextItem);
        }
        prepareUpdateToComponent(newValue, contextItem, ownerSupport);
        return true;
    }
    // detect if previous value was a tag
    const global = contextItem.global;
    if (global) {
        // its html/dom based tag
        const support = global.newest;
        if (support) {
            updateContextItemBySupport(support, contextItem, newValue, ownerSupport);
            return true;
        }
    }
    switch (tagJsType) {
        case ValueTypes.templater:
            processTag(ownerSupport, contextItem, fooCounts);
            return true;
        // when value was not a Tag before
        case ValueTypes.tag:
        case ValueTypes.dom: {
            updateToTag(newValue, contextItem, ownerSupport);
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=updateExistingValue.function.js.map