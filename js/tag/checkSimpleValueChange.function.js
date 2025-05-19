// Functions in here are attached as ContextItem.checkValueChange
import { processUpdateRegularValue } from './update/processRegularValue.function.js';
import { BasicTypes } from './ValueTypes.enum.js';
import { paintCommands, paintRemover } from '../render/paint.function.js';
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
export function deleteSimpleValue(contextItem) {
    const elm = contextItem.simpleValueElm;
    delete contextItem.simpleValueElm;
    delete contextItem.checkValueChange;
    if (!elm) {
        throw new Error('how does this happen?');
    }
    paintCommands.push({
        processor: paintRemover,
        args: [elm],
    });
}
//# sourceMappingURL=checkSimpleValueChange.function.js.map