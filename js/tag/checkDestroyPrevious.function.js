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
    const counts = { added: 0, removed: 0 };
    for (let index = 0; index < lastArray.length; ++index) {
        destroyArrayItem(lastArray[index], counts);
    }
    delete subject.lastArray;
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map