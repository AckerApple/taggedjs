export function runElementDestroyCall(nextSibling, stagger) {
    const onDestroyDoubleWrap = nextSibling.destroy; // nextSibling.ondestroy
    const onDestroyWrap = onDestroyDoubleWrap.tagFunction;
    if (!onDestroyWrap) {
        return;
    }
    const onDestroy = onDestroyWrap.tagFunction;
    const event = {
        target: nextSibling,
        stagger
    };
    return onDestroy(event);
}
//# sourceMappingURL=runElementDestroyCall.function.js.map