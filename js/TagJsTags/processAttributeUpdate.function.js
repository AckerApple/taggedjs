import { valueToTagJsVar } from "./valueToTagJsVar.function.js";
export function processAttributeUpdate(value, contextItem, ownerSupport, element, name, howToSet) {
    const oldTag = contextItem.tagJsVar; // contextItem.tagJsVar as TagJsTag
    const tagValue = value;
    const checkResult = oldTag.hasValueChanged(tagValue, contextItem, // todo: weird typing should just be ContextItem
    ownerSupport);
    if (checkResult > 0) {
        oldTag.destroy(contextItem, ownerSupport);
        element.removeAttribute(name);
        const newTagVar = valueToTagJsVar(value);
        newTagVar.isAttr = true;
        newTagVar.processInitAttribute(name, value, element, newTagVar, contextItem, ownerSupport, howToSet);
        contextItem.tagJsVar = newTagVar;
        return;
    }
}
//# sourceMappingURL=processAttributeUpdate.function.js.map