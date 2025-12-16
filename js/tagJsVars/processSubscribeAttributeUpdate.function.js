import { valueToTagJsVar } from "./valueToTagJsVar.function.js";
export function processSubscribeAttributeUpdate(contextItem, value, ownerSupport, element, name) {
    const oldValue = contextItem.value;
    const tagValue = value;
    if (!oldValue.checkValueChange) {
        console.log('no checkValueChange on', {
            oldValue,
            tagJsVar: contextItem.tagJsVar,
        });
    }
    const checkResult = oldValue.checkValueChange(tagValue, contextItem, // todo: weird typing should just be ContextItem
    { added: 0, removed: 0 }, // todo: remove
    ownerSupport);
    if (checkResult >= 0) {
        oldValue.delete(contextItem, ownerSupport);
        element.removeAttribute(name);
        const newTagVar = valueToTagJsVar(value);
        newTagVar.processInitAttribute(name, value, element, contextItem, ownerSupport);
    }
}
//# sourceMappingURL=processSubscribeAttributeUpdate.function.js.map