// taggedjs-no-compile
import { paintAppends, paintInsertBefores } from '../paint.function.js';
import { checkSimpleValueChange, deleteSimpleValue } from '../checkDestroyPrevious.function.js';
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js';
/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(value, ownerSupport, counts, insertBefore, // used during updates
appendTo) {
    const element = document.createTextNode('');
    const contextItem = {
        value,
        checkValueChange: checkSimpleValueChange,
        delete: deleteSimpleValue,
        withinOwnerElement: false,
        placeholder: element,
    };
    counts.added = counts.added + 1; // index  
    if (!appendTo) {
        paintInsertBefores.push({
            element,
            relative: insertBefore,
        });
    }
    domProcessContextItem(value, contextItem, ownerSupport, counts, appendTo, insertBefore);
    if (appendTo) {
        paintAppends.push({
            element,
            relative: appendTo,
        });
    }
    return contextItem;
}
//# sourceMappingURL=createAndProcessContextItem.function.js.map