import { providersChangeCheck } from './provider.utils';
import { renderWithSupport } from './TemplaterResult.class';
import { isLikeTags } from './isLikeTags.function';
/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(oldestTag, // existing tag already there
newTemplater, tagSupport, subject) {
    newTemplater.global = subject.tag.tagSupport.templater.global;
    if (!oldestTag.hasLiveElements) {
        throw new Error('1080 - should have live elements');
    }
    const preRenderCount = tagSupport.templater.global.renderCount;
    providersChangeCheck(oldestTag);
    // When the providers were checked, a render to myself occurred and I do not need to re-render again
    const latestTag = tagSupport.templater.global.newest;
    if (preRenderCount !== tagSupport.templater.global.renderCount) {
        oldestTag.updateByTag(latestTag);
        return latestTag;
    }
    const oldTemplater = tagSupport.templater || newTemplater;
    const redraw = renderWithSupport(newTemplater.tagSupport, subject.tag || oldTemplater.global.newest || oldTemplater.global.oldest, // hmmmmmm, why not newest?
    subject, oldestTag.ownerTag);
    const oldest = tagSupport.templater.global.oldest || oldestTag;
    redraw.tagSupport.templater.global.oldest = oldest;
    if (isLikeTags(latestTag, redraw)) {
        subject.tag = redraw;
        oldest.updateByTag(redraw);
    }
    return redraw;
}
//# sourceMappingURL=renderExistingTag.function.js.map