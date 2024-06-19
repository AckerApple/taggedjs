import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js';
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js';
import { swapInsertBefore } from '../tag/setTagPlaceholder.function.js';
export function subscribeToTemplate(fragment, insertBefore, subject, support, counts) {
    let called = false;
    const onValue = (value) => {
        if (called) {
            updateExistingValue(subject, value, support, insertBefore);
            return;
        }
        const templater = value;
        processFirstSubjectValue(templater, subject, insertBefore, support, {
            counts: { ...counts },
        }, syncRun ? fragment : undefined);
        called = true;
    };
    // TODO: may noy be needed
    // leave no template tag
    if (!subject.global.placeholder) {
        subject.global.placeholder = swapInsertBefore(insertBefore);
    }
    const callback = (value) => onValue(value);
    let syncRun = true;
    const sub = subject.subscribe(callback);
    syncRun = false;
    support.subject.global.subscriptions.push(sub);
}
//# sourceMappingURL=subscribeToTemplate.function.js.map