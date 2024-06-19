import { isLikeTags } from '../isLikeTags.function.js';
import { renderWithSupport } from './renderWithSupport.function.js';
import { providersChangeCheck } from '../../state/providersChangeCheck.function.js';
/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(oldestSupport, // oldest with elements on html
newSupport, // new to be rendered
ownerSupport, // ownerSupport
subject) {
    const lastSupport = subject.support; // todo maybe not needed?
    const global = subject.global;
    // share point between renders
    newSupport.subject.global = global;
    const preRenderCount = global.renderCount;
    providersChangeCheck(oldestSupport);
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    const prevSupport = global.newest;
    const justUpdate = preRenderCount !== global.renderCount;
    if (justUpdate) {
        oldestSupport.subject.global.oldest.updateBy(prevSupport);
        return prevSupport; // already rendered during triggered events
    }
    const toRedrawTag = prevSupport || lastSupport || global.oldest;
    const reSupport = renderWithSupport(newSupport, toRedrawTag, subject, ownerSupport);
    const oldest = global.oldest || oldestSupport;
    const isLikeTag = isLikeTags(prevSupport, reSupport);
    if (isLikeTag) {
        subject.support = reSupport;
        oldest.updateBy(reSupport);
    }
    // ??? new - added but then removed
    // global.newest = reSupport
    return reSupport;
}
//# sourceMappingURL=renderExistingTag.function.js.map