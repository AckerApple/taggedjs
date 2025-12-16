import { howToSetFirstInputValue } from "../interpolations/attributes/howToSetInputValue.function";
import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function";
import { deleteSimpleAttribute } from "./getSimpleTagVar.function";
export function processSimpleAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element, contextItem) {
    const tagJsVar = contextItem.tagJsVar;
    tagJsVar.delete = deleteSimpleAttribute;
    const isSpecial = isSpecialAttr(name);
    processNonDynamicAttr(name, value, element, howToSetFirstInputValue, isSpecial);
}
//# sourceMappingURL=processSimpleAttribute.js.map