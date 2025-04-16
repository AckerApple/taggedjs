export function getNewGlobal(subject) {
    ;
    subject.renderCount = subject.renderCount || 0;
    // ;(subject as SupportContextItem).renderCount = 0
    return subject.global = {};
}
//# sourceMappingURL=getNewGlobal.function.js.map