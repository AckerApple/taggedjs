/** checks if previous support exists on subject or as a last global support. If first render, calls builder. Otherwise calls support.updateBy() */
export function processTagResult(support, subject, // used for recording past and current value
{ counts, }, fragment) {
    // *if appears we already have seen
    const subjectTag = subject;
    const lastSupport = subjectTag.support;
    const prevSupport = lastSupport?.subject.global.oldest || undefined;
    const justUpdate = prevSupport;
    if (prevSupport && justUpdate) {
        return processTagResultUpdate(support, subjectTag, prevSupport);
    }
    const newFragment = support.buildBeforeElement(undefined, { counts });
    //if(fragment) {
    //  fragment.appendChild(newFragment)
    //} else {
    const placeholder = subject.global.placeholder;
    const parentNode = placeholder.parentNode;
    parentNode.insertBefore(newFragment, placeholder);
    //}
    return support;
}
function processTagResultUpdate(support, subject, // used for recording past and current value
prevSupport) {
    // components
    if (subject instanceof Function) {
        const newSupport = subject(prevSupport);
        prevSupport.updateBy(newSupport);
        subject.support = newSupport;
        return newSupport;
    }
    // ??? - new removed
    // prevSupport.updateBy(support)
    subject.global.oldest.updateBy(support);
    subject.support = support;
    return support;
}
//# sourceMappingURL=processTagResult.function.js.map