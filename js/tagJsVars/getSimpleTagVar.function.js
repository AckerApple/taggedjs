import { forceUpdateExistingValue } from "../index.js";
import { castTextValue } from '../castTextValue.function.js';
import { paintBeforeText, paintCommands, addPaintRemover } from "../render/paint.function.js";
import { BasicTypes } from "../index.js";
import { processUpdateRegularValue } from "../tag/update/processRegularValue.function.js";
import { processSimpleAttribute } from "./processSimpleAttribute.function.js";
import { blankHandler } from "../render/dom/blankHandler.function.js";
export function deleteSimpleAttribute(contextItem) {
    const element = contextItem.target;
    const name = contextItem.attrName;
    element.removeAttribute(name);
}
export function getSimpleTagVar(value) {
    return {
        tagJsType: 'simple',
        value,
        processInitAttribute: processSimpleAttribute,
        processInit: processSimpleValueInit,
        destroy: deleteSimpleValue,
        // TODO: get to using only checkSimpleValueChange
        hasValueChanged: checkUpdateDeleteSimpleValueChange, // For attributes, this gets switched to checkSimpleValueChange
        processUpdate: processStringUpdate, // For attributes, this gets switched to processAttributeUpdate
        // processUpdate: tagValueUpdateHandler, // For attributes, this gets switched to processAttributeUpdate
    };
}
function processStringUpdate(newValue, // newValue
contextItem, ownerSupport) {
    if (newValue === contextItem.value) {
        return 0;
    }
    return forceUpdateExistingValue(contextItem, newValue, ownerSupport);
}
function processSimpleValueInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, insertBefore, _appendTo) {
    const castedValue = castTextValue(value);
    insertBefore = contextItem.placeholder;
    // always insertBefore for content
    const paint = contextItem.paint = [paintBeforeText, [insertBefore, castedValue, function afterSimpleValue(x) {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }, 'processSimpleValueInit']];
    paintCommands.push(paint);
}
export function deleteSimpleValue(context) {
    if (!context.simpleValueElm && context.paint) {
        context.paint[0] = blankHandler;
        return; // I'm being deleted before my first render even occurred
    }
    const elm = context.simpleValueElm;
    delete context.simpleValueElm;
    addPaintRemover(elm, 'deleteSimpleValue');
}
export function checkSimpleValueChange(newValue, contextItem) {
    const isBadValue = newValue === null || newValue === undefined;
    const isRegularUpdate = isBadValue || newValue === contextItem.value; // !(typeof(newValue) === BasicTypes.object)
    if (isRegularUpdate) {
        return 0; // no need to destroy, just update display
    }
    return 6; // 'changed-simple-value'
}
export function checkUpdateDeleteSimpleValueChange(newValue, contextItem) {
    const isBadValue = newValue === null || newValue === undefined;
    const isRegularUpdate = isBadValue || !(typeof (newValue) === BasicTypes.object);
    if (isRegularUpdate) {
        // This will cause all other values to render
        processUpdateRegularValue(newValue, contextItem);
        return 0; // no need to destroy, just update display
    }
    deleteSimpleValue(contextItem);
    return 6; // 'changed-simple-value'
}
//# sourceMappingURL=getSimpleTagVar.function.js.map