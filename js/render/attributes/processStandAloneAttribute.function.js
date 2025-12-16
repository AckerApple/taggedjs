// taggedjs-no-compile
import { setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { BasicTypes, empty } from '../../tag/ValueTypes.enum.js';
import { isSpecialAttr } from '../../interpolations/attributes/isSpecialAttribute.function.js';
import { isNoDisplayValue } from './isNoDisplayValue.function.js';
import { processAttribute } from './processAttribute.function.js';
// single/stand alone attributes
export function processStandAloneAttribute(values, attrValue, element, ownerSupport, howToSet, contexts, parentContext) {
    if (isNoDisplayValue(attrValue)) {
        return;
    }
    const newContexts = [];
    // process an object of attributes ${{class:'something, checked:true}}
    if (typeof attrValue === BasicTypes.object) {
        for (const name in attrValue) {
            const isSpecial = isSpecialAttr(name); // only object variables are evaluated for is special attr
            const value = attrValue[name];
            const howToSet = setNonFunctionInputValue;
            const subContext = processAttribute(name, value, values, element, ownerSupport, howToSet, contexts, parentContext, isSpecial);
            if (subContext !== undefined) {
                if (Array.isArray(subContext)) {
                    newContexts.push(...subContext);
                }
                else {
                    newContexts.push(subContext);
                }
            }
        }
        return newContexts;
    }
    // regular attributes
    if (attrValue.length === 0) {
        return; // ignore, do not set at this time
    }
    howToSet(element, attrValue, empty);
}
//# sourceMappingURL=processStandAloneAttribute.function.js.map