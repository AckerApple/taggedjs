// taggedjs-no-compile
import { specialAttribute } from './specialAttribute.js';
import { processTagCallbackFun } from '../../render/attributes/processAttribute.function.js';
import { BasicTypes } from '../../tag/ValueTypes.enum.js';
const actions = ['init', 'destroy']; // oninit ondestroy
export function processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, counts, isSpecial) {
    contextItem.attrName = attrName;
    contextItem.element = element;
    contextItem.howToSet = howToSet;
    if (typeof (value) === BasicTypes.function) {
        if (isSpecial && actions.includes(attrName)) {
            specialAttribute(attrName, value, element, attrName, support, counts);
            return;
        }
        return processTagCallbackFun(contextItem, value, support, attrName, element);
    }
    contextItem.attrName = attrName;
    contextItem.element = element;
    contextItem.howToSet = howToSet;
    contextItem.isSpecial = isSpecial;
    return processNonDynamicAttr(attrName, value, element, howToSet, counts, support, isSpecial);
}
export function processNonDynamicAttr(attrName, value, element, howToSet, counts, support, isSpecial) {
    if (isSpecial) {
        return specialAttribute(attrName, value, element, isSpecial, support, counts);
    }
    howToSet(element, attrName, value);
}
//# sourceMappingURL=processNameValueAttribute.function.js.map