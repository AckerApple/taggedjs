import { processAttributeEmit } from './processAttribute.function.js';
import { updateNameOnlyAttrValue } from '../../interpolations/attributes/updateAttribute.function.js';
const emptyCounts = { added: 0, removed: 0 };
export function processUpdateAttrContext(value, ownerSupport, contextItem, values) {
    if (contextItem.isNameOnly) {
        updateNameOnlyAttrValue(values, value, contextItem.value, contextItem.element, // global.element as Element,
        ownerSupport, contextItem.howToSet, [], // Context, but we dont want to alter current
        emptyCounts);
        contextItem.value = value;
        return;
    }
    const element = contextItem.element;
    processAttributeEmit(value, contextItem.attrName, contextItem, element, ownerSupport, contextItem.howToSet, contextItem.isSpecial, emptyCounts);
    contextItem.value = value;
    return;
}
//# sourceMappingURL=processUpdateAttrContext.function.js.map