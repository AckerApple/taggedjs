import { deleteSubContext, guaranteeInsertBefore, onFirstSubContext } from "../index.js";
import { forceUpdateExistingValue } from "../tag/update/index.js";
function handleInnerHTML(value, newSupport, contextItem) {
    const owner = value.owner;
    const realValue = owner._innerHTML;
    realValue.processInit = realValue.oldProcessInit;
    const context = contextItem.subContext?.contextItem;
    forceUpdateExistingValue(context, realValue, newSupport);
}
function processInnerHTML(value, contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo, insertBefore) {
    contextItem.subContext = {};
    contextItem.handler = handleInnerHTML;
    checkInnerHTML(value, ownerSupport, contextItem, counts, insertBefore, appendTo);
}
function checkInnerHTML(value, ownerSupport, contextItem, counts, // {added:0, removed:0}
insertBeforeOriginal, appendTo) {
    const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal);
    const subContext = contextItem.subContext;
    subContext.appendMarker = appendMarker;
    const owner = value.owner;
    const realValue = owner._innerHTML;
    realValue.processInit = realValue.oldProcessInit;
    /** Render the content that will CONTAIN the innerHTML */
    onFirstSubContext(realValue, subContext, ownerSupport, counts, insertBefore);
}
export function getInnerHTML() {
    return {
        tagJsType: 'innerHTML',
        processInit: processInnerHTML,
        delete: deleteSubContext,
        checkValueChange: () => console.log('weird innerHTML check'),
    };
}
//# sourceMappingURL=getInnerHTML.function.js.map