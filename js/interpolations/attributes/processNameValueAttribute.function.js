import { specialAttribute } from './specialAttribute.js';
import { setNonFunctionInputValue } from './howToSetInputValue.function.js';
import { processFunctionAttr } from './processFunctionAttr.function.js';
export function processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, isSpecial) {
    contextItem.element = element;
    contextItem.howToSet = howToSet;
    contextItem.attrName = attrName;
    contextItem.isSpecial = isSpecial;
    if (value?.tagJsType) {
        return processTagJsAttribute(attrName, value, contextItem, support, element);
    }
    return processNonDynamicAttr(attrName, value, element, howToSet, isSpecial, contextItem);
}
function processTagJsAttribute(name, value, contextItem, ownerSupport, element) {
    value.processInitAttribute(name, value, element, value, contextItem, ownerSupport, setNonFunctionInputValue);
    contextItem.tagJsVar = value;
}
export function processNonDynamicAttr(attrName, value, element, howToSet, isSpecial, context) {
    if (typeof value === 'function') {
        return processFunctionAttr(value, context, attrName, element, howToSet);
    }
    if (isSpecial) {
        return specialAttribute(attrName, value, element, isSpecial);
    }
    howToSet(element, attrName, value);
}
//# sourceMappingURL=processNameValueAttribute.function.js.map