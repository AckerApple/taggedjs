import { isArray } from '../isInstance.js';
export function checkArrayValueChange(newValue, _subject) {
    // no longer an array?
    if (!isArray(newValue)) {
        // destroyArrayContext(subject)
        return 9; // 'array'
    }
    return 0;
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map