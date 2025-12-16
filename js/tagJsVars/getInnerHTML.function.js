import { deleteContextSubContext, guaranteeInsertBefore, onFirstSubContext } from "../index.js";
import { blankHandler } from "../render/dom/blankHandler.function.js";
import { forceUpdateExistingValue } from "../tag/update/index.js";
function handleInnerHTML(value, contextItem, newSupport) {
    ++contextItem.updateCount;
    const owner = value.owner;
    const realValue = owner._innerHTML;
    realValue.processInit = realValue.oldProcessInit;
    const context = contextItem.subContext?.contextItem;
    forceUpdateExistingValue(context, realValue, newSupport);
}
function processInnerHTML(value, contextItem, ownerSupport, insertBefore, appendTo) {
    contextItem.subContext = {};
    // contextItem.handler = handleInnerHTML
    value.processUpdate = handleInnerHTML;
    checkInnerHTML(value, ownerSupport, contextItem, insertBefore, appendTo);
}
function checkInnerHTML(value, ownerSupport, contextItem, insertBeforeOriginal, appendTo) {
    const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal);
    const subContext = contextItem.subContext;
    subContext.appendMarker = appendMarker;
    const owner = value.owner;
    const realValue = owner._innerHTML;
    realValue.processInit = realValue.oldProcessInit;
    /** Render the content that will CONTAIN the innerHTML */
    onFirstSubContext(realValue, subContext, ownerSupport, insertBefore);
}
export function getInnerHTML() {
    return {
        tagJsType: 'innerHTML',
        hasValueChanged: () => 0, // not expected to do anything
        processInitAttribute: blankHandler,
        processInit: processInnerHTML,
        processUpdate: handleInnerHTML,
        destroy: deleteContextSubContext,
    };
}
//# sourceMappingURL=getInnerHTML.function.js.map