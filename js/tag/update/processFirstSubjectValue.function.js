import { checkArrayValueChange, checkSimpleValueChange } from '../checkDestroyPrevious.function.js';
import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { processFirstSubjectComponent, processReplacementComponent } from './processFirstSubjectComponent.function.js';
import { newSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function.js';
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js';
import { oneRenderToSupport } from './oneRenderToSupport.function.js';
import { renderTagOnly } from '../render/renderTagOnly.function.js';
import { isArray, isSubjectInstance } from '../../isInstance.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { getNewGlobal } from './getNewGlobal.function.js';
import { processTagArray } from './processTagArray.js';
import { processNewSubjectTag } from './processNewSubjectTag.function.js';
export function processFirstSubjectValue(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, // {added:0, removed:0}
appendTo, insertBefore) {
    const tagJsType = value?.tagJsType;
    if (tagJsType) {
        return processFirstTagValue(tagJsType, contextItem, value, ownerSupport, counts, appendTo, insertBefore);
    }
    if (isArray(value)) {
        processTagArray(contextItem, value, ownerSupport, counts, appendTo);
        contextItem.checkValueChange = checkArrayValueChange;
        return;
    }
    if (isSubjectInstance(value)) {
        return; // will be subscribed to for value
    }
    processFirstRegularValue(value, contextItem, contextItem.placeholder);
}
function processFirstRegularValue(value, subject, // could be tag via subject.tag
insertBefore) {
    const castedValue = castTextValue(value);
    const clone = updateBeforeTemplate(castedValue, insertBefore);
    subject.simpleValueElm = clone;
    subject.checkValueChange = checkSimpleValueChange;
}
function processFirstTagValue(tagJsType, contextItem, value, ownerSupport, // owningSupport
counts, // {added:0, removed:0}
appendTo, insertBefore) {
    ++contextItem.renderCount;
    switch (tagJsType) {
        // TODO: Do we ever get in here? because dom, tag, and component are covered below
        case ValueTypes.templater:
            contextItem.checkValueChange = checkTagValueChange;
            if (appendTo) {
                return processNewSubjectTag(value, ownerSupport, contextItem, counts, appendTo, insertBefore);
            }
            return processTag(ownerSupport, contextItem, counts);
        case ValueTypes.dom:
        case ValueTypes.tag: {
            contextItem.checkValueChange = checkTagValueChange;
            const tag = value;
            let templater = tag.templater;
            if (!templater) {
                templater = tagFakeTemplater(tag); // TODO: most likely a not needed performance hit
            }
            const global = getNewGlobal(contextItem);
            if (appendTo) {
                return processNewSubjectTag(templater, ownerSupport, contextItem, counts, appendTo, insertBefore);
            }
            global.newest = newSupportByTemplater(templater, ownerSupport, contextItem);
            contextItem.checkValueChange = checkTagValueChange;
            return processTag(ownerSupport, contextItem, counts);
        }
        case ValueTypes.stateRender:
        case ValueTypes.tagComponent: {
            getNewGlobal(contextItem);
            contextItem.checkValueChange = checkTagValueChange;
            if (appendTo) {
                const processResult = processFirstSubjectComponent(value, contextItem, ownerSupport, counts, appendTo);
                return processResult;
            }
            const processResult = processReplacementComponent(value, contextItem, ownerSupport, counts);
            return processResult;
        }
        case ValueTypes.renderOnce: {
            getNewGlobal(contextItem);
            const support = oneRenderToSupport(value, contextItem, ownerSupport);
            renderTagOnly(support, undefined, contextItem, ownerSupport);
            const result = processNewSubjectTag(support.templater, ownerSupport, contextItem, counts, appendTo, insertBefore);
            contextItem.checkValueChange = checkTagValueChange;
            return result;
        }
    }
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map