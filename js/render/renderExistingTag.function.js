import { renderWithSupport } from './renderWithSupport.function.js';
import { processTag } from './update/processTag.function.js';
import { updateSupportBy } from './update/updateSupportBy.function.js';
export function renderExistingSupport(lastSupport, // should be global.newest
newSupport, // new to be rendered
subject) {
    const global = subject.global;
    const result = renderWithSupport(newSupport, lastSupport, subject);
    if (result.wasLikeTags) {
        updateSupportBy(global.oldest, result.support);
        return result.support;
    }
    return processTag(newSupport, subject, { added: 0, removed: 0 });
}
//# sourceMappingURL=renderExistingTag.function.js.map