import { checkArrayValueChange, destroyArrayContextItem } from '../tag/checkDestroyPrevious.function.js';
import { processTagArray } from '../tag/update/processTagArray.js';
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js';
export function getArrayTagVar(value) {
    return {
        tagJsType: 'array',
        value,
        processInit: processArrayInit,
        processUpdate: tagValueUpdateHandler,
        checkValueChange: checkArrayValueChange,
        delete: destroyArrayContextItem,
    };
}
function processArrayInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, counts, appendTo) {
    const subValue = value;
    processTagArray(contextItem, subValue, ownerSupport, counts, appendTo);
}
//# sourceMappingURL=getArrayTagJsVar.function.js.map