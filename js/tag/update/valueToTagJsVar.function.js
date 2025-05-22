import { checkArrayValueChange } from '../checkDestroyPrevious.function.js';
import { checkSimpleValueChange, deleteSimpleValue } from '../checkSimpleValueChange.function.js';
import { castTextValue } from '../../castTextValue.function.js';
import { isArray } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
import { paintBeforeText, paintCommands } from '../../render/paint.function.js';
export function valueToTagJsVar(value, contextItem) {
    const tagJsType = value?.tagJsType;
    if (tagJsType) {
        return value;
    }
    return getSimpleTagVar(value, contextItem);
}
function getSimpleTagVar(value, contextItem) {
    if (isArray(value)) {
        contextItem.checkValueChange = checkArrayValueChange;
        return {
            tagJsType: 'array',
            value,
            processInit: processArrayInit,
        };
    }
    contextItem.checkValueChange = checkSimpleValueChange;
    contextItem.delete = deleteSimpleValue;
    return {
        tagJsType: 'simple',
        value,
        processInit: processSimpleValueInit
    };
}
function processSimpleValueInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo, insertBefore) {
    // value = value.value
    const castedValue = castTextValue(value);
    insertBefore = contextItem.placeholder;
    // always insertBefore for content
    const paint = contextItem.paint = {
        processor: paintBeforeText,
        args: [insertBefore, castedValue, (x) => {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }],
    };
    paintCommands.push(paint);
    contextItem.checkValueChange = checkSimpleValueChange;
    contextItem.delete = deleteSimpleValue;
}
function processArrayInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo, insertBefore) {
    const subValue = value;
    processTagArray(contextItem, subValue, ownerSupport, counts, appendTo);
}
//# sourceMappingURL=valueToTagJsVar.function.js.map