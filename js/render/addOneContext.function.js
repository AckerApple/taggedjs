import { Subject } from '../subject/Subject.class.js';
import { valueToTagJsVar } from '../TagJsTags/valueToTagJsVar.function.js';
export function getNewContext(value, contexts, withinOwnerElement, parentContext, tagJsVar) {
    const contextItem = {
        description: 'getNewContext',
        updateCount: 0,
        value,
        destroy$: new Subject(),
        render$: new Subject(),
        // paintCommands: [],
        tagJsVar: tagJsVar || valueToTagJsVar(value),
        withinOwnerElement,
        parentContext,
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