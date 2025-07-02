import { specialAttribute } from './specialAttribute.js';
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js';
import { BasicTypes } from '../../tag/ValueTypes.enum.js';
export function processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, counts, isSpecial) {
    contextItem.element = element;
    contextItem.howToSet = howToSet;
    if (typeof (value) === BasicTypes.function) {
        return processTagCallbackFun(contextItem, value, support, attrName, element);
    }
    contextItem.attrName = attrName;
    contextItem.isSpecial = isSpecial;
    return processNonDynamicAttr(attrName, value, element, howToSet, counts, support, isSpecial);
}
export function processNonDynamicAttr(attrName, value, element, howToSet, counts, support, isSpecial) {
    if (isSpecial) {
        return specialAttribute(attrName, value, element, isSpecial);
    }
    howToSet(element, attrName, value);
}
//# sourceMappingURL=processNameValueAttribute.function.js.map