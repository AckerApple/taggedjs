import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js';
export function processUpdateContext(support, context) {
    const thisTag = support.templater.tag;
    const values = thisTag.values;
    let index = 0;
    const len = values.length;
    const counts = { added: 0, removed: 0 };
    while (index < len) {
        processUpdateOneContext(values, index, context, support, counts);
        ++index;
    }
    return context;
}
/** returns boolean of did render */
function processUpdateOneContext(values, // the interpolated values
index, context, ownerSupport, counts) {
    const value = values[index];
    // is something already there?
    const contextItem = context[index];
    // Do not continue if the value is just the same
    if (value === contextItem.value) {
        return;
    }
    const handler = contextItem.handler;
    handler(value, ownerSupport, contextItem, values, counts);
    contextItem.value = value;
    contextItem.tagJsVar = valueToTagJsVar(value);
}
//# sourceMappingURL=processUpdateContext.function.js.map