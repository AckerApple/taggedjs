import { checkArrayValueChange, checkSimpleValueChange } from '../checkDestroyPrevious.function.js';
import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
export function processFirstSubjectValue(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, // {added:0, removed:0}
appendTo, insertBefore) {
    const tagJsType = value?.tagJsType;
    if (tagJsType) {
        return value.processInit(value, contextItem, ownerSupport, counts, appendTo, insertBefore);
    }
    if (isArray(value)) {
        processTagArray(contextItem, value, ownerSupport, counts, appendTo);
        contextItem.checkValueChange = checkArrayValueChange;
        return;
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
//# sourceMappingURL=processFirstSubjectValue.function.js.map