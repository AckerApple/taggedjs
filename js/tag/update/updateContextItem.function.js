import { isSubjectInstance } from '../../isInstance.js';
export function updateContextItem(context, index, value) {
    const subject = context[index];
    const isSub = isSubjectInstance(value);
    if (isSub) {
        return; // emits on its own
    }
    // listeners will evaluate updated values to possibly update display(s)
    subject.next(value);
    return;
}
//# sourceMappingURL=updateContextItem.function.js.map