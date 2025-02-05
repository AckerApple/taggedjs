import { checkArrayValueChange, checkSimpleValueChange, checkTagValueChange } from '../checkDestroyPrevious.function.js';
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
valueId, appendTo) {
    const tagJsType = value?.tagJsType;
    if (tagJsType) {
        switch (tagJsType) {
            // TODO: Do we ever get in here? because dom, tag, and component are covered below
            case ValueTypes.templater:
                contextItem.checkValueChange = checkTagValueChange;
                if (appendTo) {
                    return processNewSubjectTag(value, ownerSupport, contextItem, appendTo, counts);
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
                    return processNewSubjectTag(templater, ownerSupport, contextItem, appendTo, counts);
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
                    // ++contextItem.global.renderCount
                    return processResult;
                }
                const processResult = processReplacementComponent(value, contextItem, ownerSupport, counts);
                // ++contextItem.global.renderCount
                return processResult;
            }
            case ValueTypes.renderOnce: {
                getNewGlobal(contextItem);
                const support = oneRenderToSupport(value, contextItem, ownerSupport);
                renderTagOnly(support, undefined, contextItem, ownerSupport);
                const result = processNewSubjectTag(support.templater, ownerSupport, contextItem, appendTo, counts);
                // ++contextItem.global.renderCount
                contextItem.checkValueChange = checkTagValueChange;
                return result;
            }
        }
    }
    if (isArray(value)) {
        processTagArray(contextItem, value, ownerSupport, counts, appendTo);
        contextItem.checkValueChange = checkArrayValueChange;
        return;
    }
    if (isSubjectInstance(value)) {
        return; // will be subscribed to for value
    }
    processFirstRegularValue(value, contextItem, contextItem.placeholder, valueId);
}
function processFirstRegularValue(value, subject, // could be tag via subject.tag
insertBefore, // <template end interpolate /> (will be removed)
valueId) {
    const castedValue = castTextValue(value);
    const clone = updateBeforeTemplate(castedValue, insertBefore);
    clone.id = valueId;
    subject.simpleValueElm = clone;
    subject.checkValueChange = checkSimpleValueChange;
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map