import { processAttributeEmit } from './processAttribute.function.js';
import { setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { updateNameOnlyAttrValue } from '../../interpolations/attributes/updateNameOnlyAttrValue.function.js';
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js';
/** Currently universally used for all attributes */
export function processUpdateAttrContext(value, contextItem, ownerSupport, values) {
    const attrContextItem = contextItem;
    const tagValue = value;
    if (tagValue?.tagJsType) {
        const oldValue = contextItem.value;
        // its now a tagVar value but before was not
        if (!oldValue?.tagJsType) {
            tagValue.isAttr = true;
            setContextInCycle(contextItem);
            tagValue.processInitAttribute(attrContextItem.attrName, value, attrContextItem.element, tagValue, attrContextItem, ownerSupport, setNonFunctionInputValue);
            removeContextInCycle();
            attrContextItem.tagJsVar = tagValue;
            return;
        }
        oldValue.hasValueChanged(tagValue, contextItem, // todo: weird typing should just be ContextItem
        ownerSupport);
        return;
    }
    if (attrContextItem.isNameOnly) {
        updateNameOnlyAttrValue(values, value, attrContextItem.value, attrContextItem.element, // global.element as Element,
        ownerSupport, attrContextItem.howToSet, [], // Context, but we dont want to alter current
        attrContextItem.parentContext);
        attrContextItem.value = value;
        return;
    }
    const element = attrContextItem.element;
    processAttributeEmit(value, attrContextItem.attrName, attrContextItem, element, ownerSupport, attrContextItem.howToSet, attrContextItem.isSpecial);
    contextItem.value = value;
    return;
}
//# sourceMappingURL=processUpdateAttrContext.function.js.map