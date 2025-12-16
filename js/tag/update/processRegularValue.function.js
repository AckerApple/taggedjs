import { castTextValue } from '../../castTextValue.function.js';
import { paintBeforeText, paintCommands, paintContent, setContent } from '../../render/paint.function.js';
import { getSimpleTagVar } from '../../tagJsVars/getSimpleTagVar.function.js';
export function processUpdateRegularValue(value, contextItem) {
    const castedValue = castTextValue(value);
    if (contextItem.paint) {
        // its already painting, just provide new text paint[function, [element, text]]
        contextItem.paint[1][1] = castedValue;
        return;
    }
    const oldClone = contextItem.simpleValueElm; // placeholder
    paintContent.push([setContent, [castedValue, oldClone]]);
}
/** Used during updates that were another value/tag first but now simple string */
export function processNowRegularValue(value, contextItem) {
    contextItem.value = value;
    contextItem.oldTagJsVar = contextItem.tagJsVar;
    contextItem.tagJsVar = getSimpleTagVar(value);
    const before = contextItem.placeholder;
    const castedValue = castTextValue(value);
    const paint = contextItem.paint = [paintBeforeText, [before, castedValue, function cleanRegularValue(x) {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }, 'processNowRegularValue']];
    paintCommands.push(paint);
}
//# sourceMappingURL=processRegularValue.function.js.map