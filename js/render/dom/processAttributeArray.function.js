import { howToSetStandAloneAttr, setNonFunctionInputValue } from "../../interpolations/attributes/howToSetInputValue.function.js";
import { processAttribute } from "../attributes/processAttribute.function.js";
export function processAttributeArray(attrs, values, domElement, support, 
// contexts: ContextItem[],
parentContext) {
    for (const attr of attrs) {
        const name = attr[0];
        const value = attr[1];
        // const isSpecial2 = !value?.tagJsVar && (typeof(name) === 'string' && isSpecialAttr(name))
        const isSpecial = attr[2] || false; // isSpecial2
        let howToSet = attr.length > 1 ? setNonFunctionInputValue : howToSetStandAloneAttr;
        if (attr[3]) {
            howToSet = attr[3];
        }
        // const contexts = support.context.contexts
        const contexts = parentContext.contexts;
        const newContext = processAttribute(name, value, values, domElement, support, howToSet, contexts, parentContext, isSpecial) || undefined;
        if (typeof newContext === 'object') {
            contexts.push(newContext);
            ++parentContext.varCounter;
        }
    }
}
//# sourceMappingURL=processAttributeArray.function.js.map