import { processAttributeEmit } from './processAttribute.function.js';
import { updateNameOnlyAttrValue } from '../../interpolations/attributes/updateAttribute.function.js';
export function processUpdateAttrContext(value, ownerSupport, contextItem, _counts, values) {
    if (contextItem.isNameOnly) {
        updateNameOnlyAttrValue(values, value, contextItem.value, contextItem.element, // global.element as Element,
        ownerSupport, contextItem.howToSet, [], // Context, but we dont want to alter current
        { added: 0, removed: 0 });
        contextItem.value = value;
        return;
    }
    const element = contextItem.element;
    processAttributeEmit(value, contextItem.attrName, contextItem, element, ownerSupport, contextItem.howToSet, contextItem.isSpecial, { added: 0, removed: 0 });
    contextItem.value = value;
    return;
}
//# sourceMappingURL=processUpdateAttrContext.function.js.map