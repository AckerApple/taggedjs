import { BasicTypes } from "../index.js";
import { castTextValue } from '../castTextValue.function.js';
import { paintBeforeText, paintCommands, paintRemover } from "../render/paint.function.js";
import { processUpdateRegularValue } from "../tag/update/processRegularValue.function.js";
export function getSimpleTagVar(value) {
    return {
        tagJsType: 'simple',
        value,
        processInit: processSimpleValueInit,
        checkValueChange: checkSimpleValueChange,
        delete: deleteSimpleValue,
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
}
export function deleteSimpleValue(contextItem) {
    const elm = contextItem.simpleValueElm;
    delete contextItem.simpleValueElm;
    delete contextItem.tagJsVar;
    paintCommands.push({
        processor: paintRemover,
        args: [elm],
    });
}
export function checkSimpleValueChange(newValue, contextItem) {
    const isBadValue = newValue === null || newValue === undefined;
    if (isBadValue || !(typeof (newValue) === BasicTypes.object)) {
        // This will cause all other values to render
        processUpdateRegularValue(newValue, contextItem);
        return -1; // no need to destroy, just update display
    }
    deleteSimpleValue(contextItem);
    return 6; // 'changed-simple-value'
}
//# sourceMappingURL=getSimpleTagVar.function.js.map