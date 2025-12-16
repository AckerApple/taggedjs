import { checkArrayValueChange } from '../tag/checkDestroyPrevious.function.js';
import { processTagArray } from '../tag/update/arrays/processTagArray.js';
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { destroyArrayContext } from '../tag/destroyArrayContext.function.js';
/** how to process an array */
export function getArrayTagVar(value) {
    return {
        tagJsType: 'array',
        value,
        processInitAttribute: blankHandler,
        processInit: processArrayInit,
        processUpdate: processArrayUpdates,
        hasValueChanged: checkArrayValueChange,
        destroy: destroyArrayContext,
    };
}
function processArrayUpdates(newValue, contextItem, ownerSupport) {
    ++contextItem.updateCount;
    if (Array.isArray(newValue)) {
        processTagArray(contextItem, newValue, ownerSupport);
        return;
    }
    const tagUpdateResponse = tagValueUpdateHandler(newValue, contextItem, ownerSupport);
    if (tagUpdateResponse === 0) {
        processTagArray(contextItem, newValue, ownerSupport);
    }
}
function processArrayInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, _insertBefore, appendTo) {
    const subValue = value;
    processTagArray(contextItem, subValue, ownerSupport, appendTo);
}
//# sourceMappingURL=getArrayTagJsVar.function.js.map