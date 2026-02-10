import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function.js";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function.js";
import { checkSimpleValueChange, deleteSimpleAttribute } from "./getSimpleTagVar.function.js";
import { processAttributeUpdate } from "./processAttributeUpdate.function.js";
/** init runner */
export function processSimpleAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element, tagJsVar, contextItem, _ownerSupport, howToSet) {
    // function swapping
    tagJsVar.destroy = deleteSimpleAttribute;
    tagJsVar.hasValueChanged = checkSimpleValueChange;
    tagJsVar.processUpdate = (value, contextItem, ownerSupport) => {
        return processAttributeUpdate(value, contextItem, ownerSupport, element, name, howToSet);
    };
    const isSpecial = isSpecialAttr(name, element.tagName);
    processNonDynamicAttr(name, value, element, howToSet, isSpecial, contextItem);
    contextItem.tagJsVar = tagJsVar;
}
//# sourceMappingURL=processSimpleAttribute.function.js.map