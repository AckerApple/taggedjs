import { checkArrayValueChange, destroyArrayContextItem } from '../tag/checkDestroyPrevious.function.js';
import { processTagArray } from '../tag/update/processTagArray.js';
export function getArrayTagVar(value) {
    return {
        tagJsType: 'array',
        value,
        processInit: processArrayInit,
        checkValueChange: checkArrayValueChange,
        delete: destroyArrayContextItem,
    };
}
function processArrayInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, counts, // {added:0, removed:0}
appendTo) {
    const subValue = value;
    processTagArray(contextItem, subValue, ownerSupport, counts, appendTo);
}
//# sourceMappingURL=getArrayTagJsVar.function.js.map