export function destroyTagMemory(oldSupport) {
    // must destroy oldest which is tag with elements on stage
    const oldest = oldSupport.subject.global.oldest;
    oldest.destroy();
    oldSupport.subject.global.context = {};
}
//# sourceMappingURL=destroyTag.function.js.map