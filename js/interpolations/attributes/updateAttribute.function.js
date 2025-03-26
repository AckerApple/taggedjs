// taggedjs-no-compile
import { BasicTypes } from '../../tag/ValueTypes.enum.js';
import { paintContent } from '../../tag/paint.function.js';
import { isNoDisplayValue, processNameOnlyAttrValue } from './processAttribute.function.js';
export function updateNameOnlyAttrValue(values, attrValue, lastValue, element, ownerSupport, howToSet, context, counts) {
    // check to remove previous attribute(s)
    if (lastValue) {
        if (isNoDisplayValue(attrValue)) {
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
                    paintContent.push(function paintContent() {
                        element.removeAttribute(name);
                    });
                }
            }
            else {
                for (const name in lastValue) {
                    paintContent.push(function paintContent() {
                        element.removeAttribute(name);
                    });
                }
            }
        }
    }
    processNameOnlyAttrValue(values, attrValue, element, ownerSupport, howToSet, context, counts);
}
//# sourceMappingURL=updateAttribute.function.js.map