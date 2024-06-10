import { processFirstSubjectValue } from '../tag/update/processFirstSubjectValue.function.js';
import { updateExistingValue } from '../tag/update/updateExistingValue.function.js';
import { swapInsertBefore } from '../tag/setTagPlaceholder.function.js';
export function subscribeToTemplate(fragment, insertBefore, subject, ownerSupport, counts) {
    let called = false;
    const onValue = (value) => {
        if (called) {
            updateExistingValue(subject, value, ownerSupport, insertBefore);
            return;
        }
        const templater = value;
        processFirstSubjectValue(templater, subject, insertBefore, ownerSupport, {
            counts: { ...counts },
        }, syncRun ? fragment : undefined);
        called = true;
    };
    // leave no template tag
    if (!subject.global.placeholder) {
        subject.global.placeholder = swapInsertBefore(insertBefore);
    }
    let mutatingCallback = onValue;
    const callback = (value) => mutatingCallback(value);
    let syncRun = true;
    const sub = subject.subscribe(callback);
    syncRun = false;
    ownerSupport.subject.global.subscriptions.push(sub);
}
//# sourceMappingURL=subscribeToTemplate.function.js.map