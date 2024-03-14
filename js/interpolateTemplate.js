import { variablePrefix } from "./Tag.class";
import { elementInitCheck } from "./elementInitCheck";
import { processSubjectValue } from "./processSubjectValue.function";
import { isTagArray, isTagComponent } from "./isInstance";
import { scanTextAreaValue } from "./scanTextAreaValue.function";
export function interpolateTemplate(insertBefore, // <template end interpolate /> (will be removed)
context, // variable scope of {`__tagvar${index}`:'x'}
ownerTag, // Tag class
counts, // used for animation stagger computing
options) {
    // TODO: THe clones array is useless here
    const clones = [];
    if (!insertBefore.hasAttribute('end')) {
        return { clones }; // only care about <template end>
    }
    const variableName = insertBefore.getAttribute('id');
    if (variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
        return { clones }; // ignore, not a tagVar
    }
    const existingSubject = context[variableName];
    // process dynamics later
    if (isTagComponent(existingSubject.value) || isTagArray(existingSubject.value)) {
        return { clones, tagComponent: { ownerTag, subject: existingSubject, insertBefore } };
    }
    let isForceElement = options.forceElement;
    subscribeToTemplate(insertBefore, existingSubject, ownerTag, counts, { isForceElement });
    return { clones };
}
export function subscribeToTemplate(insertBefore, subject, ownerTag, counts, // used for animation stagger computing
{ isForceElement }) {
    const callback = (value) => {
        const clone = subject.clone;
        if (clone) {
            insertBefore = clone;
        }
        processSubjectValue(value, subject, insertBefore, ownerTag, {
            counts: { ...counts },
            forceElement: isForceElement,
        });
        if (isForceElement) {
            isForceElement = false; // only can happen once
        }
        // ownerTag.clones.push(...nextClones)
        // clones.push(...nextClones)
    };
    const sub = subject.subscribe(callback);
    ownerTag.cloneSubs.push(sub);
}
// Function to update the value of x
export function updateBetweenTemplates(value, lastFirstChild) {
    const parent = lastFirstChild.parentNode;
    // mimic React skipping to display EXCEPT for true does display on page
    if (value === undefined || value === false || value === null) { // || value === true
        value = '';
    }
    // Insert the new value (never use innerHTML here)
    const textNode = document.createTextNode(value); // never innerHTML
    parent.insertBefore(textNode, lastFirstChild);
    /* remove existing nodes */
    parent.removeChild(lastFirstChild);
    return textNode;
}
export function afterElmBuild(elm, options, context, ownerTag) {
    if (!elm.getAttribute) {
        return;
    }
    const tagName = elm.nodeName; // elm.tagName
    if (tagName === 'TEXTAREA') {
        scanTextAreaValue(elm, context, ownerTag);
    }
    let diff = options.counts.added;
    if (!options.forceElement) {
        diff = elementInitCheck(elm, options.counts) - diff;
    }
    if (elm.children) {
        const subCounts = {
            added: options.counts.added, // - diff,
            removed: options.counts.removed,
        };
        new Array(...elm.children).forEach((child, index) => {
            const subOptions = {
                ...options,
                counts: options.counts,
            };
            return afterElmBuild(child, subOptions, context, ownerTag);
        });
    }
}
//# sourceMappingURL=interpolateTemplate.js.map