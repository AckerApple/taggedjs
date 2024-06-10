import { isStaticTag } from '../isInstance.js';
import { isLikeTags } from './isLikeTags.function.js';
import { destroyTagMemory } from './destroyTag.function.js';
import { ValueTypes } from './ValueTypes.enum.js';
export function checkDestroyPrevious(subject, // existing.value is the old value
newValue, insertBefore, valueType) {
    const displaySubject = subject;
    const hasLastValue = 'lastValue' in displaySubject;
    const lastValue = displaySubject.lastValue; // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
    // was simple value but now something bigger
    if (hasLastValue && lastValue !== newValue) {
        // below is faster than using getValueType
        const newType = typeof (newValue);
        if (isSimpleType(newType) && typeof (lastValue) === newType) {
            return false;
        }
        if (newValue instanceof Function && lastValue instanceof Function) {
            return false;
        }
        destroySimpleValue(displaySubject);
        return 'changed-simple-value';
    }
    const arraySubject = subject;
    const wasArray = arraySubject.lastArray;
    // no longer an array
    if (wasArray && valueType !== ValueTypes.tagArray) {
        delete arraySubject.lastArray;
        for (let index = wasArray.array.length - 1; index >= 0; --index) {
            const { support } = wasArray.array[index];
            destroyArrayTag(support, { added: 0, removed: 0 });
        }
        return 'array';
    }
    const tagSubject = subject;
    const lastSupport = tagSubject.support;
    // no longer tag or component?
    if (lastSupport) {
        const isValueTag = isStaticTag(newValue);
        const isSubjectTag = isStaticTag(subject._value);
        const newTag = newValue;
        if (isSubjectTag && isValueTag) {
            // its a different tag now
            if (!isLikeTags(newTag, lastSupport)) {
                // put template back down
                destroyTagMemory(lastSupport);
                return 2;
            }
            return false;
        }
        if (valueType === ValueTypes.tagComponent) {
            return false; // its still a tag component
        }
        if (newValue && newValue.oneRender) {
            return false;
        }
        // destroy old component, value is not a component
        destroyTagMemory(lastSupport);
        // delete lastSupport.global.deleted // ???
        return 'different-tag';
    }
    return false;
}
export function isSimpleType(value) {
    return ['string', 'number', 'boolean'].includes(value);
}
export function destroyArrayTag(support, counts) {
    support.destroy({
        stagger: counts.removed++,
    });
}
function destroySimpleValue(subject) {
    delete subject.lastValue;
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map