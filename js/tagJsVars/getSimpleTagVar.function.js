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
contextItem, ownerSupport, counts, appendTo, insertBefore) {
    // value = value.value
    const castedValue = castTextValue(value);
    insertBefore = contextItem.placeholder;
    // always insertBefore for content
    const paint = contextItem.paint = [paintBeforeText, [insertBefore, castedValue, (x) => {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }]];
    paintCommands.push(paint);
}
export function deleteSimpleValue(contextItem) {
    const elm = contextItem.simpleValueElm;
    delete contextItem.simpleValueElm;
    delete contextItem.tagJsVar;
    // is it being destroyed before it was even built?
    if (contextItem.paint !== undefined) {
        const paintIndex = paintCommands.findIndex(paint => paint === contextItem.paint);
        paintCommands.splice(paintIndex, 1);
        return;
    }
    paintCommands.push([paintRemover, [elm]]);
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