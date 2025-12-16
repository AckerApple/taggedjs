import { removeContextInCycle, setContextInCycle } from './cycles/setContextInCycle.function.js';
export function processUpdateContext(support, contexts) {
    const thisTag = support.templater.tag;
    const values = thisTag.values;
    for (const context of contexts) {
        // const context = contexts[index]
        processUpdateOneContext(values, context, support);
    }
    return contexts;
}
/** returns boolean of did render */
function processUpdateOneContext(values, // the interpolated values
contextItem, ownerSupport) {
    if (contextItem.deleted) {
        return;
    }
    // some values, like style, get rearranged and there value appearance may not match context appearance
    const valueIndex = contextItem.valueIndex;
    const newValue = values[valueIndex];
    // Removed, let the tagJsVars do the checking
    // Do not continue if the value is just the same
    /*
    if(newValue === contextItem.value) {
      return
    }
    */
    const tagJsVar = contextItem.tagJsVar;
    setContextInCycle(contextItem);
    tagJsVar.processUpdate(newValue, contextItem, ownerSupport, values);
    removeContextInCycle();
    contextItem.value = newValue;
}
//# sourceMappingURL=processUpdateContext.function.js.map