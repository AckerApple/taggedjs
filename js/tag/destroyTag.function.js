export function destroyTagMemory(oldTagSupport) {
    // must destroy oldest which is tag with elements on stage
    const oldest = oldTagSupport.global.oldest;
    oldest.destroy();
    destroyTagSupportPast(oldTagSupport);
    oldTagSupport.global.context = {};
}
export function destroyTagSupportPast(oldTagSupport) {
    delete oldTagSupport.global.oldest; // TODO: This appears redundant of oldest.destroy() which clears global already
    delete oldTagSupport.global.newest;
}
//# sourceMappingURL=destroyTag.function.js.map