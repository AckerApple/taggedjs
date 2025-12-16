/** Only used in TagSupport */
export function getNewGlobal(contextItem) {
    // TODO: Not need for basic supports, only tag()
    contextItem.renderCount = contextItem.renderCount || 0;
    contextItem.varCounter = 0;
    // TODO: Not need for basic supports, only tag()
    contextItem.state = {
        newer: {
            state: [],
            states: [],
        },
    };
    return contextItem.global = {
        blocked: [],
    };
}
//# sourceMappingURL=getNewGlobal.function.js.map