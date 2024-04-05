export function destroyTagMemory(tag, subject) {
    const oldTagSupport = tag.tagSupport;
    if (subject != tag.tagSupport.subject) {
        throw new Error('fff - subjects do not match');
    }
    delete subject.tag;
    delete tag.tagSupport.subject.tag; // TODO: this line maybe not needed
    // must destroy oldest which is tag with elements on stage
    const oldest = tag.tagSupport.templater.global.oldest;
    oldest.destroy();
    destroyTagSupportPast(oldTagSupport);
    tag.tagSupport.templater.global.context = {};
}
export function destroyTagSupportPast(oldTagSupport) {
    delete oldTagSupport.templater.global.oldest;
    delete oldTagSupport.templater.global.newest;
}
//# sourceMappingURL=destroyTag.function.js.map