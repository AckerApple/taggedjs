export function getChildTagsToDestroy(childTags, allTags = []) {
    for (let index = childTags.length - 1; index >= 0; --index) {
        const cTag = childTags[index];
        allTags.push(cTag);
        childTags.splice(index, 1);
        getChildTagsToDestroy(cTag.subject.global.childTags, allTags);
    }
    return allTags;
}
//# sourceMappingURL=destroy.support.js.map