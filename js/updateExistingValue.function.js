import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from './isInstance';
import { applyFakeTemplater, processTag } from './processSubjectValue.function';
import { processTagArray } from './processTagArray';
import { updateExistingTagComponent } from './updateExistingTagComponent.function';
import { processRegularValue } from './processRegularValue.function';
import { checkDestroyPrevious } from './checkDestroyPrevious.function';
import { processSubjectComponent } from './processSubjectComponent.function';
import { isLikeTags } from './isLikeTags.function';
import { bindSubjectCallback } from './bindSubjectCallback.function';
export function updateExistingValue(subject, value, ownerTag, insertBefore) {
    const subjectSubTag = subject;
    const isComponent = isTagComponent(value);
    const oldInsertBefore = subject.template || subjectSubTag.tag?.tagSupport.templater.global.insertBefore || subject.clone;
    checkDestroyPrevious(subject, value);
    // handle already seen tag components
    if (isComponent) {
        const templater = value;
        // When was something before component
        if (!subjectSubTag.tag) {
            processSubjectComponent(templater, subject, oldInsertBefore, ownerTag, {
                forceElement: true,
                counts: { added: 0, removed: 0 },
            });
            return subjectSubTag;
        }
        updateExistingTagComponent(ownerTag, templater, // latest value
        subjectSubTag, insertBefore);
        return subjectSubTag;
    }
    // was component but no longer
    const subjectTag = subjectSubTag.tag;
    if (subjectTag) {
        handleStillTag(subjectTag, subject, value, ownerTag);
        return subjectSubTag;
    }
    // its another tag array
    if (isTagArray(value)) {
        processTagArray(subject, value, oldInsertBefore, ownerTag, { counts: {
                added: 0,
                removed: 0,
            } });
        return subject;
    }
    // now its a function
    if (value instanceof Function) {
        // const newSubject = getSubjectFunction(value, ownerTag)
        const bound = bindSubjectCallback(value, ownerTag);
        subject.set(bound);
        return subject;
    }
    if (isTagInstance(value)) {
        subjectSubTag.template = oldInsertBefore;
        processTag(value, subjectSubTag, subjectSubTag.template, ownerTag);
        return subjectSubTag;
    }
    // we have been given a subject
    if (isSubjectInstance(value)) {
        return value;
    }
    // This will cause all other values to render
    processRegularValue(value, subject, oldInsertBefore);
    return subjectSubTag;
}
function handleStillTag(existingTag, subject, value, ownerTag) {
    // TODO: We shouldn't need both of these
    const isSameTag = value && isLikeTags(existingTag, value);
    const isSameTag2 = value && value.getTemplate && existingTag.isLikeTag(value);
    const tag = value;
    if (!tag.tagSupport) {
        applyFakeTemplater(tag, ownerTag, subject);
    }
    if (isSameTag) {
        existingTag.updateByTag(tag);
        return;
    }
    if (isSameTag || isSameTag2) {
        return processTag(value, subject, subject.template, ownerTag);
    }
    return processRegularValue(value, subject, subject.template);
}
//# sourceMappingURL=updateExistingValue.function.js.map