import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from './isInstance';
import { bindSubjectCallback } from './bindSubjectCallback.function';
import { processTag } from './processSubjectValue.function';
import { processTagArray } from './processTagArray';
import { updateExistingTagComponent } from './updateExistingTagComponent.function';
import { updateExistingTag } from './updateExistingTag.function';
import { processRegularValue } from './processRegularValue.function';
import { checkDestroyPrevious } from './checkDestroyPrevious.function';
export function updateExistingValue(subject, value, ownerTag) {
    const subjectSubArray = subject;
    const subjectSubTag = subject;
    const isChildSubject = subjectSubArray.isChildSubject;
    const isComponent = isTagComponent(value);
    // If we are working with tag component 2nd argument children, the value has to be digged
    if (isChildSubject) {
        value = value.value; // A subject contains the value
    }
    const oldInsertBefore = subject.template || subjectSubTag.tag?.tagSupport.templater.insertBefore || subjectSubTag.clone;
    checkDestroyPrevious(subject, value);
    // handle already seen tag components
    if (isComponent) {
        if (!subjectSubTag.tag) {
            const templater = value;
            const { retag } = templater.renderWithSupport(value.tagSupport, undefined, ownerTag);
            templater.newest = retag;
            templater.oldest = retag;
            subjectSubTag.tag = retag;
            subjectSubTag.tagSupport = retag.tagSupport;
            retag.buildBeforeElement(oldInsertBefore, {
                forceElement: true,
                counts: { added: 0, removed: 0 },
            });
            return;
        }
        return updateExistingTagComponent(ownerTag, value, // latest value
        subjectSubTag);
    }
    // was component but no longer
    const subjectTag = subjectSubTag.tag;
    if (subjectTag) {
        handleStillTag(subjectTag, subject, value, ownerTag);
        return;
    }
    // its another tag array
    if (isTagArray(value)) {
        const insertBefore = subjectSubArray.template || subjectSubTag.tag?.tagSupport.templater.insertBefore;
        processTagArray(subject, value, insertBefore, ownerTag, { counts: {
                added: 0,
                removed: 0,
            } });
        return;
    }
    // now its a function
    if (value instanceof Function) {
        subjectSubTag.set(bindSubjectCallback(value, ownerTag));
        return;
    }
    // we have been given a subject
    if (isSubjectInstance(value)) {
        subjectSubTag.set(value.value); // let ValueSubject now of newest value
        return;
    }
    if (isTagInstance(value)) {
        subjectSubTag.template = oldInsertBefore;
    }
    // This will cause all other values to render
    subjectSubTag.set(value); // let ValueSubject now of newest value
    return;
}
function handleStillTag(existingTag, existing, value, ownerTag) {
    const oldWrapper = existingTag.tagSupport.templater.wrapper;
    const newWrapper = value?.wrapper;
    const wrapMatch = oldWrapper && newWrapper && oldWrapper?.original === newWrapper?.original;
    // TODO: We shouldn't need both of these
    const isSameTag = value && existingTag.lastTemplateString === value.lastTemplateString;
    const isSameTag2 = value && value.getTemplate && existingTag.isLikeTag(value);
    if (isSameTag || isSameTag2) {
        return processTag(value, existing, existing.template, ownerTag, // existingTag, // tag,
        {
            counts: {
                added: 0,
                removed: 0,
            }
        });
    }
    if (wrapMatch) {
        return updateExistingTag(value, existingTag, existing);
    }
    const subject = existing;
    return processRegularValue(value, subject, subject.template);
}
//# sourceMappingURL=updateExistingValue.function.js.map