export function processTagResult(tag, result, // used for recording past and current value
insertBefore, // <template end interpolate />
{ index, counts, forceElement, }) {
    // *for
    if (index !== undefined) {
        const existing = result.lastArray[index];
        if (existing?.tag.isLikeTag(tag)) {
            existing.tag.updateByTag(tag);
            return [];
        }
        const lastFirstChild = insertBefore; // tag.clones[0] // insertBefore.lastFirstChild
        const clones = tag.buildBeforeElement(lastFirstChild, { counts, forceElement });
        result.lastArray.push({
            tag, index
        });
        return clones;
    }
    // *if appears we already have seen
    const rTag = result.tag;
    if (rTag && !forceElement) {
        // are we just updating an if we already had?
        if (rTag.isLikeTag(tag)) {
            // components
            if (result instanceof Function) {
                const newTag = result(rTag.tagSupport);
                rTag.updateByTag(newTag);
                return [];
            }
            rTag.updateByTag(tag);
            return []; // no clones created in element already on stage
        }
    }
    const clones = tag.buildBeforeElement(insertBefore, {
        counts,
        forceElement,
    });
    result.tag = tag; // let reprocessing know we saw this previously as an if
    return clones;
}
//# sourceMappingURL=processTagResult.function.js.map