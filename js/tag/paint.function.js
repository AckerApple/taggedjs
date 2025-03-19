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
    ++painting.locks;
    for (const toRemove of paintRemoves) {
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
    for (const now of paintAfters) {
        now();
    }
    paintRemoves = [];
    paintContent = [];
    paintAppends = [];
    paintInsertBefores = [];
    paintAfters = [];
    setContent = [];
    --painting.locks;
}
//# sourceMappingURL=paint.function.js.map