import { destroyArrayItem } from './update/compareArrayItems.function.js';
import { isArray } from '../isInstance.js';
export function checkArrayValueChange(newValue, subject) {
    // no longer an array?
    if (!isArray(newValue)) {
        destroyArrayContextItem(subject);
        return 9; // 'array'
    }
    return false;
}
export function destroyArrayContextItem(subject) {
    const lastArray = subject.lastArray;
    destroyArray(subject, lastArray);
}
export function destroyArray(subject, lastArray) {
    for (let index = 0; index < lastArray.length; ++index) {
        destroyArrayItem(lastArray[index]);
    }
    delete subject.lastArray;
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map