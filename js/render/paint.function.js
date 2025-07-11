import { blankHandler } from "./dom/attachDomElements.function.js";
/** Typically used for animations to run before clearing elements */
export function addPaintRemoveAwait(promise) {
    if (paintRemoveAwaits.length) {
        paintRemoveAwaits[paintRemoveAwaits.length - 1].paintRemoves.push(...paintRemoves);
        paintRemoves = [];
    }
    paintRemoveAwaits.push({ promise, paintRemoves });
    paintRemoves = [];
}
let paintRemoveAwaits = [];
export let paintCommands = [];
export let paintRemoves = [];
export let paintContent = [];
// TODO: This this is duplicate of paintCommands (however timing is currently and issue and cant be removed)
export let paintAppends = [];
export let paintAfters = []; // callbacks after all painted
export const painting = {
    locks: 0,
    removeLocks: 0,
};
export function setContent(text, textNode) {
    textNode.textContent = text;
}
export function paint() {
    if (painting.locks > 0) {
        return;
    }
    return runCycles();
}
function runCycles() {
    runPaintCycles();
    runAfterCycle();
}
function runAfterCycle() {
    paintReset();
    const nowPaintAfters = paintAfters;
    paintAfters = []; // prevent paintAfters calls from endless recursion
    for (const content of nowPaintAfters) {
        content[0](...content[1]);
    }
}
function runPaintRemoves() {
    if (paintRemoveAwaits.length) {
        const currentAwaits = paintRemoveAwaits.map(data => data.promise.then(() => {
            const paintRemoves = data.paintRemoves;
            for (const content of paintRemoves) {
                // call paintRemover()
                content[0](...content[1]);
            }
        }));
        paintRemoveAwaits = [];
        const outerPaintRemoves = paintRemoves;
        return Promise.all(currentAwaits).then(() => {
            for (const content of outerPaintRemoves) {
                content[0](...content[1]);
            }
        });
    }
    // element.parentNode.removeChild
    for (const content of paintRemoves) {
        content[0](...content[1]);
    }
}
function runPaintCycles() {
    runPaintRemoves();
    paintRemoves = [];
    // styles/attributes and textElement.textContent
    for (const content of paintContent) {
        content[0](...content[1]);
    }
    // .appendChild
    for (const content of paintAppends) {
        content[0](...content[1]);
    }
    // element.insertBefore
    for (const content of paintCommands) {
        content[0](...content[1]);
    }
}
function paintReset() {
    paintCommands = [];
    paintContent = [];
    paintAppends = [];
}
export function addPaintRemover(element) {
    paintRemoves.push([paintRemover, [element]]);
}
/** must be used with paintRemoves */
function paintRemover(element, _caller) {
    const parentNode = element.parentNode;
    parentNode.removeChild(element);
}
export function paintBefore(relative, element) {
    relative.parentNode.insertBefore(element, relative);
}
export function paintAppend(relative, element) {
    relative.appendChild(element);
}
const contentCleaner = (typeof document === 'object' && document.createElement('div')); // used for content cleaning
function toPlainTextElm(text) {
    // swap &gt; for >
    contentCleaner.innerHTML = text; // script tags should have already been sanitized before this step
    // delete <!-- -->
    return document.createTextNode(contentCleaner.innerHTML);
}
export function paintBeforeText(relative, text, callback = blankHandler) {
    const textElm = toPlainTextElm(text);
    paintBefore(relative, textElm);
    callback(textElm);
}
export function paintAppendText(relative, text, callback) {
    const textElm = toPlainTextElm(text);
    paintAppend(relative, textElm);
    callback(textElm);
}
/** Used when HTML content is safe and expected */
export function paintBeforeElementString(relative, text, callback = blankHandler) {
    contentCleaner.innerHTML = text;
    const textElm = document.createTextNode(contentCleaner.textContent); // toPlainTextElm(text)
    paintBefore(relative, textElm);
    callback(textElm);
}
/** Used when HTML content is safe and expected */
export function paintAppendElementString(relative, text, callback) {
    contentCleaner.innerHTML = text;
    const textElm = document.createTextNode(contentCleaner.textContent); // toPlainTextElm(text)
    paintAppend(relative, textElm);
    callback(textElm);
}
//# sourceMappingURL=paint.function.js.map