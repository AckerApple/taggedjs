import { blankHandler } from "./dom/attachDomElements.function.js";
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
        now.processor(...now.args);
    }
    for (const item of paintCommands) {
        item.processor(...item.args);
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
export function paintBefore(relative, element) {
    relative.parentNode.insertBefore(element, relative);
}
export function paintAppend(relative, element) {
    relative.appendChild(element);
}
const someDiv = (typeof document === 'object' && document.createElement('div')); // used for content cleaning
function toPlainTextElm(text) {
    // swap &gt; for >
    someDiv.innerHTML = text; // script tags should have already been sanitized before this step
    // delete <!-- -->
    return document.createTextNode(someDiv.innerHTML);
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
    someDiv.innerHTML = text;
    const textElm = document.createTextNode(someDiv.textContent); // toPlainTextElm(text)
    paintBefore(relative, textElm);
    callback(textElm);
}
/** Used when HTML content is safe and expected */
export function paintAppendElementString(relative, text, callback) {
    someDiv.innerHTML = text;
    const textElm = document.createTextNode(someDiv.textContent); // toPlainTextElm(text)
    paintAppend(relative, textElm);
    callback(textElm);
}
//# sourceMappingURL=paint.function.js.map