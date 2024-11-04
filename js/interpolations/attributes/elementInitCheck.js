export function elementInitCheck(nextSibling, counts) {
    // const onInitDoubleWrap = (nextSibling as any).oninit
    const onInitDoubleWrap = nextSibling.init;
    if (!onInitDoubleWrap) {
        return counts.added;
    }
    const onInitWrap = onInitDoubleWrap.tagFunction;
    if (!onInitWrap) {
        return counts.added;
    }
    const onInit = onInitWrap.tagFunction;
    if (!onInit) {
        return counts.added;
    }
    const event = { target: nextSibling, stagger: counts.added };
    onInit(event);
    return ++counts.added;
}
//# sourceMappingURL=elementInitCheck.js.map