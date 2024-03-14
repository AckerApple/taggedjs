export function processTagResult(tag, result, // used for recording past and current value
insertBefore, // <template end interpolate />
{ counts, forceElement, }) {
    // *if appears we already have seen
    const subjectTag = result;
    const rTag = subjectTag.tag;
    if (rTag && !forceElement) {
        // are we just updating an if we already had?
        if (rTag.isLikeTag(tag)) {
            // components
            if (result instanceof Function) {
                const newTag = result(rTag.tagSupport);
                rTag.updateByTag(newTag);
                return;
            }
            rTag.updateByTag(tag);
            return;
        }
    }
    tag.buildBeforeElement(insertBefore, {
        counts,
        forceElement,
    });
    subjectTag.tag = subjectTag.tag || tag; // let reprocessing know we saw this previously as an if
}
//# sourceMappingURL=processTagResult.function.js.map