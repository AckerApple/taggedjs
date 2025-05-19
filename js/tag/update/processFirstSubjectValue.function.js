import { checkArrayValueChange } from '../checkDestroyPrevious.function.js';
import { checkSimpleValueChange, deleteSimpleValue } from '../checkSimpleValueChange.function.js';
import { castTextValue } from '../../castTextValue.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
import { paintBeforeText, paintCommands } from '../../render/paint.function.js';
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
    const paint = subject.paint = {
        processor: paintBeforeText,
        args: [insertBefore, castedValue, (x) => {
                subject.simpleValueElm = x;
                delete subject.paint;
            }],
    };
    paintCommands.push(paint);
    subject.checkValueChange = checkSimpleValueChange;
    subject.delete = deleteSimpleValue;
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map