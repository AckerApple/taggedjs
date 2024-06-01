import { isSubjectInstance, isTagComponent } from '../../isInstance.js';
import { TagSupport } from '../TagSupport.class.js';
export function updateContextItem(context, variableName, value) {
    const subject = context[variableName];
    const tagSubject = subject;
    const tagSupport = tagSubject.tagSupport;
    if (tagSupport) {
        if (value) {
            if (isTagComponent(value)) {
                const templater = value;
                let newSupport = new TagSupport(templater, tagSupport.ownerTagSupport, subject);
                // TODO: Need to review if this is used
                if (isTagComponent(tagSupport)) {
                    console.warn('👉 deprecated code is being used #shareTemplaterGlobal 👈');
                    shareTemplaterGlobal(tagSupport, newSupport);
                }
            }
        }
    }
    if (isSubjectInstance(value)) {
        return; // emits on its own
    }
    // listeners will evaluate updated values to possibly update display(s)
    subject.next(value);
    return;
}
function shareTemplaterGlobal(oldTagSupport, tagSupport) {
    const oldTemp = oldTagSupport.templater;
    const oldWrap = oldTemp.wrapper; // tag versus component
    const oldValueFn = oldWrap.parentWrap.original;
    const templater = tagSupport.templater;
    const newWrapper = templater.wrapper;
    const newValueFn = newWrapper?.parentWrap.original;
    const fnMatched = oldValueFn === newValueFn;
    if (fnMatched) {
        tagSupport.global = oldTagSupport.global;
        const newest = oldTagSupport.global.newest;
        if (newest) {
            const prevState = newest.memory.state;
            tagSupport.memory.state.length = 0;
            tagSupport.memory.state.push(...prevState);
        }
    }
}
//# sourceMappingURL=updateContextItem.function.js.map