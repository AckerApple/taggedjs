export function getNewGlobal(contextItem) {
    ;
    contextItem.renderCount = contextItem.renderCount || 0;
    return contextItem.global = {};
}
//# sourceMappingURL=getNewGlobal.function.js.map