import { destroyArrayItem } from './update/arrays/compareArrayItems.function.js';
export function destroyArrayContext(context) {
    ++context.updateCount;
    const lastArray = context.lastArray;
    destroyArray(context, lastArray);
}
/** Deletes entire array context not just one */
export function destroyArray(subject, lastArray) {
    for (let index = 0; index < lastArray.length; ++index) {
        destroyArrayItem(lastArray[index]);
    }
    delete subject.lastArray;
}
//# sourceMappingURL=destroyArrayContext.function.js.map