// Functions in here are attached as ContextItem.checkValueChange
import { processUpdateRegularValue } from './update/processRegularValue.function.js';
import { destroyArrayItem } from './update/compareArrayItems.function.js';
import { isArray } from '../isInstance.js';
import { paintRemoves } from './paint.function.js';
import { BasicTypes } from './ValueTypes.enum.js';
export function checkArrayValueChange(newValue, subject) {
    // no longer an array?
    if (!isArray(newValue)) {
        const lastArray = subject.lastArray;
        destroyArray(subject, lastArray);
        return 9; // 'array'
    }
    return false;
}
export function destroyArray(subject, lastArray) {
    const counts = { added: 0, removed: 0 };
    for (let index = 0; index < lastArray.length; ++index) {
        destroyArrayItem(lastArray[index], counts);
    }
    delete subject.lastArray;
}
export function checkSimpleValueChange(newValue, subject) {
    const isBadValue = newValue === null || newValue === undefined;
    if (isBadValue || !(typeof (newValue) === BasicTypes.object)) {
        // This will cause all other values to render
        processUpdateRegularValue(newValue, subject);
        return -1; // no need to destroy, just update display
    }
    deleteSimpleValue(subject);
    return 6; // 'changed-simple-value'
}
export function deleteSimpleValue(subject) {
    const elm = subject.simpleValueElm;
    delete subject.simpleValueElm;
    paintRemoves.push(elm);
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map