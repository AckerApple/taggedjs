import { castTextValue } from '../../castTextValue.function.js';
import { paintBeforeText, paintCommands, setContent } from '../../render/paint.function.js';
import { checkSimpleValueChange, deleteSimpleValue } from '../checkSimpleValueChange.function.js';
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
export function processNowRegularValue(value, subject) {
    subject.checkValueChange = checkSimpleValueChange;
    subject.delete = deleteSimpleValue;
    const before = subject.placeholder;
    const castedValue = castTextValue(value);
    const paint = subject.paint = {
        processor: paintBeforeText,
        args: [before, castedValue, (x) => {
                subject.simpleValueElm = x;
                subject.simpleValueElm = x;
                delete subject.paint;
            }],
    };
    paintCommands.push(paint);
}
//# sourceMappingURL=processRegularValue.function.js.map