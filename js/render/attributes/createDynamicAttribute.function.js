// taggedjs-no-compile
import { BasicTypes } from '../../tag/index.js';
import { processDynamicNameValueAttribute } from '../../interpolations/attributes/processNameValueAttribute.function.js';
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js';
import { getTagVarIndex } from './getTagVarIndex.function.js';
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js';
import { Subject } from '../../subject/Subject.class.js';
import { processTagCallbackFun } from './processAttribute.function.js';
/** Support string attributes with dynamics Ex: <div style="color:black;font-size::${fontSize};"></div> */
export function createDynamicArrayAttribute(attrName, array, element, contexts, howToSet, //  = howToSetInputValue
values, parentContext) {
    const startIndex = contexts.length;
    const createdContexts = [];
    // loop all to attach context and processors
    array.forEach((value) => {
        const valueVar = getTagVarIndex(value);
        if (valueVar >= 0) {
            const myIndex = contexts.length;
            const tagJsVar = valueToTagJsVar(value);
            const contextItem = {
                updateCount: 0,
                isAttr: true,
                element,
                attrName: attrName,
                withinOwnerElement: true,
                tagJsVar,
                valueIndex: parentContext.varCounter, // contexts.length,
                parentContext,
                destroy$: new Subject(),
                render$: new Subject(),
            };
            // contextItem.handler =
            tagJsVar.processUpdate = function arrayItemHandler(value, contextItem, newSupport, newValues) {
                ++contextItem.updateCount;
                setBy(newValues);
            };
            const pushValue = values[myIndex];
            contextItem.value = pushValue;
            createdContexts.push(contextItem);
            ++parentContext.varCounter;
        }
    });
    function setBy(values) {
        const concatValue = buildNewValueFromArray(array, values, startIndex).join('');
        howToSet(element, attrName, concatValue);
    }
    setBy(values);
    return createdContexts;
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
export function createDynamicAttribute(attrName, value, element, context, parentContext, howToSet, //  = howToSetInputValue
support, isSpecial, varIndex) {
    if (typeof (value) === BasicTypes.function) {
        ++parentContext.varCounter;
        return processTagCallbackFun(
        // contextItem,
        value, support, attrName, element);
    }
    const tagJsVar = valueToTagJsVar(value);
    const contextItem = {
        updateCount: 0,
        isAttr: true,
        element,
        attrName,
        howToSet,
        value,
        withinOwnerElement: true,
        tagJsVar,
        destroy$: new Subject(),
        render$: new Subject(),
        valueIndex: varIndex,
        parentContext,
    };
    context.push(contextItem);
    tagJsVar.processUpdate = processUpdateAttrContext;
    processDynamicNameValueAttribute(attrName, value, contextItem, element, howToSet, support, isSpecial);
    contextItem.value = value;
    return contextItem;
}
//# sourceMappingURL=createDynamicAttribute.function.js.map