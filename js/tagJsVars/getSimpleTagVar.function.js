import { castTextValue } from '../castTextValue.function.js';
import { paintBeforeText, paintCommands, addPaintRemover } from "../render/paint.function.js";
import { BasicTypes } from "../index.js";
import { processUpdateRegularValue } from "../tag/update/processRegularValue.function.js";
import { tagValueUpdateHandler } from "../tag/update/tagValueUpdateHandler.function.js";
export function getSimpleTagVar(value) {
    return {
        tagJsType: 'simple',
        value,
        processInit: processSimpleValueInit,
        delete: deleteSimpleValue,
        // TODO: get down to only one
        checkValueChange: checkSimpleValueChange,
        processUpdate: tagValueUpdateHandler,
    };
}
function processSimpleValueInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, counts, appendTo, insertBefore) {
    // value = value.value
    const castedValue = castTextValue(value);
    insertBefore = contextItem.placeholder;
    // always insertBefore for content
    const paint = contextItem.paint = [paintBeforeText, [insertBefore, castedValue, function afterSimpleValue(x) {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }]];
    paintCommands.push(paint);
}
export function deleteSimpleValue(contextItem) {
    const elm = contextItem.simpleValueElm;
    delete contextItem.simpleValueElm;
    addPaintRemover(elm);
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