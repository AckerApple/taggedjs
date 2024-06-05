import { isLikeTags } from '../isLikeTags.function.js';
import { destroyTagMemory } from '../destroyTag.function.js';
import { renderTagOnly } from './renderTagOnly.function.js';
export function renderWithSupport(newTagSupport, lastSupport, // previous
subject, // events & memory
ownerSupport) {
    const reSupport = renderTagOnly(newTagSupport, lastSupport, subject, ownerSupport);
    const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport);
    if (!isLikeTag) {
        destroyUnlikeTags(lastSupport, reSupport, subject);
        reSupport.global.oldest = reSupport;
    }
    const lastOwnerSupport = lastSupport?.ownerTagSupport;
    reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport);
    return reSupport;
}
function destroyUnlikeTags(lastSupport, // old
reSupport, // new
subject) {
    const oldGlobal = lastSupport.global;
    const insertBefore = oldGlobal.insertBefore;
    destroyTagMemory(lastSupport);
    // when a tag is destroyed, disconnect the globals
    reSupport.global = { ...oldGlobal }; // break memory references
    const global = reSupport.global;
    global.insertBefore = insertBefore;
    global.deleted = false;
    global.oldest = reSupport;
    global.newest = reSupport;
    subject.tagSupport = reSupport;
}
//# sourceMappingURL=renderWithSupport.function.js.map