import { isTagArray, isTagComponent, isTagInstance } from './isInstance';
import { isLikeTags } from './isLikeTags.function';
import { destroyTagMemory, destroyTagSupportPast } from './destroyTag.function';
export function checkDestroyPrevious(subject, // existing.value is the old value
newValue) {
    const existingSubArray = subject;
    const wasArray = existingSubArray.lastArray;
    // no longer an array
    if (wasArray && !isTagArray(newValue)) {
        wasArray.forEach(({ tag }) => destroyArrayTag(tag, { added: 0, removed: 0 }));
        delete subject.lastArray;
        return 1;
    }
    const tagSubject = subject;
    const existingTag = tagSubject.tag;
    // no longer tag or component?
    if (existingTag) {
        const isValueTag = isTagInstance(newValue);
        const isSubjectTag = isTagInstance(subject.value);
        if (isSubjectTag && isValueTag) {
            const newTag = newValue;
            if (!isLikeTags(newTag, existingTag)) {
                destroyTagMemory(existingTag, tagSubject);
                return 2;
            }
            return false;
        }
        const isValueTagComponent = isTagComponent(newValue);
        if (isValueTagComponent) {
            return false; // its still a tag component
        }
        // destroy old component, value is not a component
        destroyTagMemory(existingTag, tagSubject);
        return 3;
    }
    const displaySubject = subject;
    const hasLastValue = 'lastValue' in displaySubject;
    const lastValue = displaySubject.lastValue; // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
    // was simple value but now something bigger
    if (hasLastValue && lastValue !== newValue) {
        destroySimpleValue(displaySubject.template, displaySubject);
        return 4;
    }
    return false;
}
export function destroyArrayTag(tag, counts) {
    destroyTagSupportPast(tag.tagSupport);
    tag.destroy({
        stagger: counts.removed++,
    });
}
function destroySimpleValue(template, subject) {
    const clone = subject.clone;
    const parent = clone.parentNode;
    // put the template back down
    parent.insertBefore(template, clone);
    parent.removeChild(clone);
    delete subject.clone;
    delete subject.lastValue;
    // subject.template = template
}
//# sourceMappingURL=checkDestroyPrevious.function.js.map