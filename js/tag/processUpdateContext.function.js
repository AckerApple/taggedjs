export function processUpdateContext(support, contexts) {
    const thisTag = support.templater.tag;
    const values = thisTag.values;
    let index = 0;
    const len = values.length;
    const counts = { added: 0, removed: 0 };
    while (index < len) {
        processUpdateOneContext(values, index, contexts, support, counts);
        ++index;
    }
    return contexts;
}
/** returns boolean of did render */
function processUpdateOneContext(values, // the interpolated values
index, context, ownerSupport, counts) {
    const newValue = values[index];
    const contextItem = context[index];
    // Do not continue if the value is just the same
    if (newValue === contextItem.value) {
        return;
    }
    const tagJsVar = contextItem.tagJsVar;
    tagJsVar.processUpdate(newValue, ownerSupport, contextItem, counts, values);
    contextItem.value = newValue;
    // contextItem.tagJsVar = valueToTagJsVar(newValue)
}
//# sourceMappingURL=processUpdateContext.function.js.map