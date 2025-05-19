// taggedjs-no-compile
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js';
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js';
/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(value, ownerSupport, counts, insertBefore, // used during updates
appendTo) {
    const element = document.createTextNode('');
    const contextItem = {
        value,
        checkValueChange: undefined, // gets populated in domProcessContextItem
        delete: undefined, // gets populated in domProcessContextItem
        withinOwnerElement: false,
        placeholder: element,
    };
    counts.added = counts.added + 1; // index  
    if (!appendTo) {
        paintCommands.push({
            processor: paintBefore,
            args: [insertBefore, element],
        });
    }
    domProcessContextItem(value, ownerSupport, contextItem, counts, appendTo, insertBefore);
    if (appendTo) {
        paintAppends.push({
            processor: paintAppend,
            args: [appendTo, element],
        });
    }
    return contextItem;
}
//# sourceMappingURL=createAndProcessContextItem.function.js.map