export let paintCommands = [];
export let paintContent = [];
export let setContent = [];
export let paintAppends = [];
export let paintAfters = []; // callbacks after all painted
export const painting = {
    locks: 0
};
export function paint() {
    if (painting.locks > 0) {
        return;
    }
    for (const content of paintContent) {
        content();
    }
    for (const [text, textNode] of setContent) {
        textNode.textContent = text;
    }
    for (const now of paintAppends) {
        now.relative.appendChild(now.element);
    }
    for (const item of paintCommands) {
        item.processor(item.element, item.relative);
    }
    paintReset();
    for (const now of paintAfters) {
        now();
    }
    paintAfters = [];
}
function paintReset() {
    paintCommands = [];
    paintContent = [];
    paintAppends = [];
    setContent = [];
}
export function paintRemover(element) {
    const parentNode = element.parentNode;
    parentNode.removeChild(element);
}
export function paintBefore(element, relative) {
    relative.parentNode.insertBefore(element, relative);
}
//# sourceMappingURL=paint.function.js.map