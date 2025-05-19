import { renderWithSupport } from './renderWithSupport.function.js';
import { processTag } from './update/processTag.function.js';
import { updateSupportBy } from './update/updateSupportBy.function.js';
const fooCounts = { added: 0, removed: 0 };
// TODO: This function is being called for 1st time renders WHEN renderCount === 1
export function renderExistingReadyTag(lastSupport, // should be global.newest
newSupport, // new to be rendered
ownerSupport, // ownerSupport
subject) {
    const global = subject.global;
    const { support, wasLikeTags } = renderWithSupport(newSupport, lastSupport, // renderCount <= 0 ? undefined : lastSupport
    subject, ownerSupport);
    if (wasLikeTags) {
        updateSupportBy(global.oldest, support);
        return support;
    }
    processTag(ownerSupport, subject, fooCounts);
    return support;
}
//# sourceMappingURL=renderExistingTag.function.js.map