import { isLikeTags } from '../isLikeTags.function.js';
import { renderTagOnly } from './renderTagOnly.function.js';
import { destroyUnlikeTags } from './destroyUnlikeTags.function.js';
import { softDestroySupport } from './softDestroySupport.function.js';
export function renderWithSupport(newSupport, lastSupport, // previous
subject, // events & memory
ownerSupport) {
    const lastTemplater = lastSupport?.templater;
    const lastStrings = lastTemplater?.tag?.strings;
    const reSupport = renderTagOnly(newSupport, lastSupport, subject, ownerSupport);
    const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport);
    if (!isLikeTag) {
        destroyUnlikeTags(lastSupport, reSupport, subject);
    }
    else if (lastSupport) {
        const oldLength = lastStrings?.length;
        const newLength = reSupport.templater.tag?.strings.length;
        if (oldLength !== newLength) {
            softDestroySupport(lastSupport);
        }
    }
    const lastOwnerSupport = lastSupport?.ownerSupport;
    reSupport.ownerSupport = (ownerSupport || lastOwnerSupport);
    return reSupport;
}
//# sourceMappingURL=renderWithSupport.function.js.map