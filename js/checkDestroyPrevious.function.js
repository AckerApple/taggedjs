import { isTagArray, isTagComponent, isTagInstance } from './isInstance';
import { isLikeTags } from './isLikeTags.function';
export function checkDestroyPrevious(existing, // existing.value is the old value
newValue) {
    const existingSubArray = existing;
    const wasArray = existingSubArray.lastArray;
    // no longer an array
    if (wasArray && !isTagArray(newValue)) {
        wasArray.forEach(({ tag }) => destroyArrayTag(tag, { added: 0, removed: 0 }));
        delete existing.lastArray;
        return 1;
    }
    const tagSubject = existing;
    const existingTag = tagSubject.tag;
    // no longer tag or component?
    if (existingTag) {
        const isValueTag = isTagInstance(newValue);
        const isSubjectTag = isTagInstance(existing.value);
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
    const displaySubject = existing;
    const hasLastValue = 'lastValue' in displaySubject;
    const lastValue = displaySubject.lastValue; // TODO: we maybe able to use displaySubject.value and remove concept of lastValue
    // was simple value but now something bigger
    if (hasLastValue && lastValue !== newValue) {
        destroySimpleValue(displaySubject.template, displaySubject);
        return 4;
    }
    return false;
}
export function destroyTagMemory(existingTag, existingSubject) {
    delete existingSubject.tag;
    delete existingSubject.tagSupport;
    existingTag.destroy();
}
export function destroyArrayTag(tag, counts) {
    /*
    tag.children.forEach(child => child.destroy({
      stagger: counts.removed++,
      // byParent: false
      // byParent: true,
    }))
    */
    // tag.destroyClones({stagger:counts.removed++})
    tag.destroy({
        stagger: counts.removed++,
        // byParent: false
        // byParent: true,
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