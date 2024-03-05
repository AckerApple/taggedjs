import { isSubjectInstance, isTagArray, isTagComponent, isTagInstance } from "./isInstance.js";
import { bindSubjectCallback } from "./bindSubjectCallback.function.js";
import { destroySimpleValue, processTag } from "./processSubjectValue.function.js";
import { processTagArray } from "./processTagArray.js";
import { updateExistingTagComponent } from "./updateExistingTagComponent.function.js";
import { updateExistingTag } from "./updateExistingTag.function.js";
import { processRegularValue } from "./processRegularValue.function.js";
function checkDestroyPrevious(existing, value) {
    const existingSubArray = existing;
    const wasArray = existingSubArray.lastArray;
    // no longer an array
    if (wasArray && !isTagArray(value)) {
        wasArray.forEach(({ tag }) => tag.destroy());
        delete existing.lastArray;
        return;
    }
    const existingTagSubject = existing;
    const existingTag = existingTagSubject.tag;
    const isValueTagComponent = isTagComponent(value);
    const isSimpleValue = !(isValueTagComponent || isTagArray(value) || isTagInstance(value));
    // no longer tag or component?
    if (existingTag) {
        // no longer a component
        if (isTagComponent(existingTag) && !isValueTagComponent) {
            destroyTagMemory(existingTag, existingTagSubject);
            return;
        }
        // no longer a tag
        if (!isTagInstance(value)) {
            destroyTagMemory(existingTag, existingTagSubject);
            return;
        }
        return; // was tag and still is tag
    }
    const displaySubject = existing;
    const clone = displaySubject.clone;
    // was simple value but now something bigger
    if (clone && !isSimpleValue) {
        destroySimpleValue(displaySubject.template, displaySubject);
    }
}
export function updateExistingValue(existing, value, ownerTag) {
    const subjectValue = existing.value;
    const tempResult = value;
    const existingSubArray = existing;
    const existingSubTag = existing;
    checkDestroyPrevious(existing, value);
    // If we are working with tag component 2nd argument children, the value has to be digged
    if (existingSubArray.isChildSubject) {
        value = value.value; // A subject contains the value
    }
    // was component but no longer
    const existingTag = existingSubTag.tag;
    if (existingTag) {
        handleStillTag(existingTag, existing, value, ownerTag);
        return;
    }
    // its another tag array
    if (isTagArray(value)) {
        const insertBefore = existingSubArray.template || existingSubTag.tag?.insertBefore;
        processTagArray(existing, value, insertBefore, ownerTag, { counts: {
                added: 0,
                removed: 0,
            } });
        return;
    }
    // handle already seen tag components
    if (isTagComponent(tempResult)) {
        return updateExistingTagComponent(ownerTag, tempResult, existingSubTag, subjectValue);
    }
    // now its a function
    if (value instanceof Function) {
        existingSubTag.set(bindSubjectCallback(value, ownerTag));
        return;
    }
    // we have been given a subject
    if (isSubjectInstance(value)) {
        existingSubTag.set(value.value); // let ValueSubject now of newest value
        return;
    }
    existingSubTag.set(value); // let ValueSubject now of newest value
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
    return processRegularValue(value, subject, subject.template, ownerTag);
}
export function destroyTagMemory(existingTag, existingSubject) {
    delete existingSubject.tag;
    delete existingSubject.tagSupport;
    // delete subjectValue.tagSupport
    existingTag.destroy();
}
//# sourceMappingURL=updateExistingValue.function.js.map