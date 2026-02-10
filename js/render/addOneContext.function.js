import { Subject } from '../subject/Subject.class.js';
import { valueToTagJsVar } from '../TagJsTags/valueToTagJsVar.function.js';
export function getNewContext(value, contexts, withinOwnerElement, parentContext) {
    const contextItem = {
        updateCount: 0,
        value,
        destroy$: new Subject(),
        render$: new Subject(),
        // paintCommands: [],
        tagJsVar: valueToTagJsVar(value),
        withinOwnerElement,
        parentContext,
        // TODO: remove with html``
        // valueIndex: contexts?.length || -1, // when -1 its a raw bolt value
        // valueIndex: contexts.length
        valueIndex: parentContext.varCounter,
    };
    return contextItem;
}
/** auto adds onto parent.contexts */
export function addOneContext(value, contexts, withinOwnerElement, parentContext) {
    const contextItem = getNewContext(value, contexts, withinOwnerElement, parentContext);
    contexts.push(contextItem);
    ++parentContext.varCounter;
    return contextItem;
}
//# sourceMappingURL=addOneContext.function.js.map