import { renderWithSupport } from './renderWithSupport.function.js';
import { processTag } from '../update/processTag.function.js';
import { updateSupportBy } from '../updateSupportBy.function.js';
export function renderExistingReadyTag(lastSupport, newSupport, // new to be rendered
ownerSupport, // ownerSupport
subject) {
    const global = subject.global;
    const { support, wasLikeTags } = renderWithSupport(newSupport, lastSupport, subject, ownerSupport);
    if (wasLikeTags) {
        updateSupportBy(global.oldest, support);
        // updateSupportValuesBy(oldest, support)
        // paint()
        return support;
    }
    processTag(ownerSupport, subject);
    return support;
}
//# sourceMappingURL=renderExistingTag.function.js.map