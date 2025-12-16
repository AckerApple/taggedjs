import { renderWithSupport } from './renderWithSupport.function.js';
import { processTag } from './update/processTag.function.js';
import { updateSupportBy } from './update/updateSupportBy.function.js';
export function renderExistingSupport(lastSupport, // should be global.newest
newSupport, // new to be rendered
subject) {
    const result = renderWithSupport(newSupport, lastSupport, subject);
    if (result.wasLikeTags) {
        const oldest = subject.state.oldest; // || result.support
        updateSupportBy(oldest, result.support);
        return result.support;
    }
    return processTag(newSupport, subject);
}
//# sourceMappingURL=renderExistingTag.function.js.map