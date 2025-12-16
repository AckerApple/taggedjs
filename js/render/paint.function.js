import { blankHandler } from "./dom/blankHandler.function.js";
/** Typically used for animations to run before clearing elements */
export function addPaintRemoveAwait(_promise) {
    /*
    if(paintRemoveAwaits.length) {
      paintRemoveAwaits[paintRemoveAwaits.length - 1].paintRemoves.push( ...paintRemoves )
      paintRemoves = []
    }
  
    paintRemoveAwaits.push({promise, paintRemoves})
    paintRemoves = []
    */
}
// let paintRemoveAwaits: {promise: Promise<any>, paintRemoves: PaintCommand[]}[] = []
export let paintCommands = [];
// export let paintRemoves: PaintCommand[] = []
export const paintRemoves = [];
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
/** you must lock before calling this function */
export function paint() {
    if (painting.locks > 0) {
        // throw new Error('double paint')
        return;
    }
    runCycles();
}
function runCycles() {
    ++painting.locks;
    runPaintCycles();
    --painting.locks;
    runAfterCycle();
}
/** Deletes happen last */
function runAfterCycle() {
    paintReset();
    const nowPaintAfters = paintAfters;
    paintAfters = []; // prevent paintAfters calls from endless recursion
    for (const content of nowPaintAfters) {
        content[0](...content[1]);
    }
}
function runPaintRemoves() {
    // element.parentNode.removeChild
    for (const content of paintRemoves) {
        content[0](...content[1]);
    }
}
function runPaintCycles() {
    const removes = paintRemoves.length;
    runPaintRemoves();
    // paintRemoves = []
    paintRemoves.splice(0, removes);
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
export function addPaintRemover(element, caller) {
    paintRemoves.push([paintRemover, [element, caller]]);
}
/** must be used with paintRemoves */
function paintRemover(element, _caller) {
    const parentNode = element.parentNode;
    /*
    if(!element) {
      console.debug('no element by', _caller)
    }
    if(!parentNode) {
      console.debug('no parentNode by', _caller)
    }
    */
    parentNode.removeChild(element);
}
/** insertBefore. For parent.appendChild() see paintAppend */
export function paintBefore(relative, element, _caller) {
    const parentNode = relative.parentNode;
    parentNode.insertBefore(element, relative);
}
/** parent.appendChild(). For insertBefore see paintBefore */
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
export function paintBeforeText(relative, text, callback = blankHandler, _caller) {
    const textElm = toPlainTextElm(text);
    paintBefore(relative, textElm, _caller);
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
    paintBefore(relative, textElm, 'paintBeforeElementString');
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