export function destroyTagMemory(oldSupport) {
    const global = oldSupport.subject.global;
    // must destroy oldest which is tag with elements on stage
    const oldest = global.oldest;
    oldest.destroy();
    oldSupport.subject.global.context = [];
}
//# sourceMappingURL=destroyTag.function.js.map