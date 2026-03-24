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
    const TagJsTag = contextItem.tagJsVar;
    setContextInCycle(contextItem);
    TagJsTag.processUpdate('', // newValue,
    contextItem, ownerSupport, values);
    removeContextInCycle();
    // contextItem.value = newValue
}
//# sourceMappingURL=processUpdateContext.function.js.map