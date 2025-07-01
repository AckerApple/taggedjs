// taggedjs-no-compile
import { processDynamicNameValueAttribute } from '../../interpolations/attributes/processNameValueAttribute.function.js';
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js';
import { getTagVarIndex } from './getTagVarIndex.function.js';
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js';
/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export function createDynamicArrayAttribute(attrName, array, element, context, howToSet, //  = howToSetInputValue
support, counts, values) {
    const startIndex = context.length;
    // loop all to attach context and processors
    array.forEach((value) => {
        const valueVar = getTagVarIndex(value);
        if (valueVar >= 0) {
            const myIndex = context.length;
            const tagJsVar = valueToTagJsVar(value);
            const contextItem = {
                isAttr: true,
                element,
                attrName: attrName,
                withinOwnerElement: true,
                tagJsVar,
            };
            // contextItem.handler =
            tagJsVar.processUpdate = function arrayItemHanlder(value, newSupport, contextItem, counts, newValues) {
                setBy(newValues);
            };
            const pushValue = values[myIndex];
            contextItem.value = pushValue;
            context.push(contextItem);
        }
    });
    function setBy(values) {
        const concatValue = buildNewValueFromArray(array, values, startIndex).join('');
        howToSet(element, attrName, concatValue);
    }
    setBy(values);
}
function buildNewValueFromArray(array, values, startIndex) {
    return array.reduce((all, value) => {
        const valueVar = getTagVarIndex(value);
        if (valueVar >= 0) {
            const myIndex = startIndex++;
            const pushValue = values[myIndex];
            all.push(pushValue);
            return all;
        }
        all.push(value);
        return all;
    }, []);
}
export function createDynamicAttribute(attrName, value, element, context, howToSet, //  = howToSetInputValue
support, counts, isSpecial) {
    const tagJsVar = valueToTagJsVar(value);
    const contextItem = {
        isAttr: true,
        element,
        attrName,
        withinOwnerElement: true,
        tagJsVar,
    };
    context.push(contextItem);
    tagJsVar.processUpdate = processUpdateAttrContext;
    processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, counts, isSpecial);
    contextItem.value = value;
}
//# sourceMappingURL=createDynamicAttribute.function.js.map