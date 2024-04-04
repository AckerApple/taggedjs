import { destroyTagMemory } from './destroyTag.function';
export function processTagResult(tag, subject, // used for recording past and current value
insertBefore, // <template end interpolate />
{ counts, forceElement, }) {
    if (!insertBefore.parentNode) {
        throw new Error('before here processTagResult');
    }
    // *if appears we already have seen
    const subjectTag = subject;
    const existingTag = subjectTag.tag;
    const previousTag = existingTag?.tagSupport.templater.global.oldest || undefined; // || tag.tagSupport.oldest // subjectTag.tag
    const justUpdate = previousTag; // && !forceElement
    if (previousTag) {
        if (justUpdate) {
            const areLike = previousTag.isLikeTag(tag);
            // are we just updating an if we already had?
            if (areLike) {
                // components
                if (subject instanceof Function) {
                    const newTag = subject(previousTag.tagSupport);
                    previousTag.updateByTag(newTag);
                    if (!newTag.tagSupport.templater.global.oldest) {
                        throw new Error('maybe 0');
                    }
                    subjectTag.tag = newTag;
                    if (!newTag.hasLiveElements) {
                        throw new Error('44444 - 2');
                    }
                    return;
                }
                previousTag.updateByTag(tag);
                if (!tag.tagSupport.templater.global.oldest) {
                    throw new Error('maybe 1');
                }
                subjectTag.tag = tag;
                if (!tag.hasLiveElements) {
                    throw new Error('44444 - 3');
                }
                return;
            }
            destroyTagMemory(previousTag, subject);
            throw new Error('585 - think we never get here');
        }
    }
    tag.buildBeforeElement(insertBefore, {
        counts,
        forceElement, test: false,
    });
}
//# sourceMappingURL=processTagResult.function.js.map