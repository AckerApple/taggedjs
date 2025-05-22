import { castTextValue } from '../../castTextValue.function.js';
import { paintBeforeText, paintCommands, setContent } from '../../render/paint.function.js';
import { getSimpleTagVar } from '../../tagJsVars/getSimpleTagVar.function.js';
export function processUpdateRegularValue(value, contextItem) {
    const castedValue = castTextValue(value);
    if (contextItem.paint) {
        // its already painting, just provide new text
        contextItem.paint.args[1] = castedValue;
        return;
    }
    const oldClone = contextItem.simpleValueElm; // placeholder
    setContent.push([castedValue, oldClone]);
}
/** Used during updates that were another value/tag first but now simple string */
export function processNowRegularValue(value, contextItem) {
    contextItem.value = value;
    contextItem.tagJsVar = getSimpleTagVar(value);
    const before = contextItem.placeholder;
    const castedValue = castTextValue(value);
    const paint = contextItem.paint = {
        processor: paintBeforeText,
        args: [before, castedValue, (x) => {
                contextItem.simpleValueElm = x;
                delete contextItem.paint;
            }],
    };
    paintCommands.push(paint);
}
//# sourceMappingURL=processRegularValue.function.js.map