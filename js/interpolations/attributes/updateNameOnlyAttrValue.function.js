// taggedjs-no-compile
import { BasicTypes } from '../../tag/ValueTypes.enum.js';
import { paintContent } from '../../render/paint.function.js';
import { processStandAloneAttribute } from '../../render/attributes/processStandAloneAttribute.function.js';
import { isNoDisplayValue } from '../../render/attributes/isNoDisplayValue.function.js';
export function updateNameOnlyAttrValue(values, attrValue, lastValue, element, ownerSupport, howToSet, contexts, parentContext) {
    // check to remove previous attribute(s)
    if (lastValue) {
        if (isNoDisplayValue(attrValue) || attrValue === '') {
            element.removeAttribute(lastValue);
            return;
        }
        if (typeof (lastValue) === BasicTypes.object) {
            const isObStill = typeof (attrValue) === BasicTypes.object;
            if (isObStill) {
                for (const name in lastValue) {
                    // if((attrValue as any)[name]) {
                    if (name in attrValue) {
                        continue;
                    }
                    paintContent.push([removeAttribute, [element, name]]);
                }
            }
            else {
                for (const name in lastValue) {
                    paintContent.push([removeAttribute, [element, name]]);
                }
            }
        }
    }
    const standAloneResult = processStandAloneAttribute(values, attrValue, element, ownerSupport, howToSet, contexts, parentContext);
    if (standAloneResult) {
        contexts.push(...standAloneResult);
    }
}
function removeAttribute(element, name) {
    element.removeAttribute(name);
}
//# sourceMappingURL=updateNameOnlyAttrValue.function.js.map