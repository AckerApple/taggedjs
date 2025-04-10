export let paintRemoves = [];
export let paintContent = [];
export let setContent = [];
/** array memory that runs and completes BEFORE paintInsertBefores array */
export let paintAppends = [];
/** array memory that runs and completes AFTER paintAppends array */
export let paintInsertBefores = [];
export let paintAfters = []; // callbacks after all painted
export const painting = {
    locks: 0
};
export function paint() {
    if (painting.locks > 0) {
        return;
    }
    for (let index = paintRemoves.length - 1; index >= 0; --index) {
        const toRemove = paintRemoves[index];
        const parentNode = toRemove.parentNode;
        parentNode.removeChild(toRemove);
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
    for (const { element, relative } of paintInsertBefores) {
        relative.parentNode.insertBefore(element, relative);
    }
    paintRemoves = [];
    paintContent = [];
    paintAppends = [];
    paintInsertBefores = [];
    setContent = [];
    for (const now of paintAfters) {
        now();
    }
    paintAfters = [];
}
//# sourceMappingURL=paint.function.js.map