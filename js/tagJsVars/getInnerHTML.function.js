import { deleteSubContext, guaranteeInsertBefore, onFirstSubContext } from "../index.js";
import { forceUpdateExistingValue } from "../tag/update/index.js";
function handleInnerHTML(value, newSupport, contextItem, _values, counts) {
    const owner = value.owner;
    const realValue = owner._innerHTML;
    realValue.processInit = realValue.oldProcessInit;
    const context = contextItem.subContext?.contextItem;
    forceUpdateExistingValue(context, realValue, newSupport, counts);
}
function processInnerHTML(value, contextItem, ownerSupport, counts, appendTo, insertBefore) {
    contextItem.subContext = {};
    // contextItem.handler = handleInnerHTML
    value.processUpdate = handleInnerHTML;
    checkInnerHTML(value, ownerSupport, contextItem, counts, insertBefore, appendTo);
}
function checkInnerHTML(value, ownerSupport, contextItem, counts, insertBeforeOriginal, appendTo) {
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
        processUpdate: handleInnerHTML,
        delete: deleteSubContext,
    };
}
//# sourceMappingURL=getInnerHTML.function.js.map