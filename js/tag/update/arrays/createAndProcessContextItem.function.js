// taggedjs-no-compile
import { paintAppend, paintAppends } from '../../../render/paint.function.js';
import { domProcessContextItem } from '../../../interpolations/optimizers/domProcessContextItem.function.js';
import { empty } from '../../ValueTypes.enum.js';
import { getNewContext } from '../../../render/addOneContext.function.js';
/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(value, ownerSupport, contexts, insertBefore, // used during updates
appendTo) {
    const element = document.createTextNode(empty);
    const contextItem = getNewContext(value, contexts, true, ownerSupport.context);
    contextItem.withinOwnerElement = false;
    contextItem.placeholder = element;
    if (!appendTo) {
        contextItem.placeholder = insertBefore;
    }
    domProcessContextItem(value, ownerSupport, contextItem, appendTo, insertBefore);
    if (appendTo) {
        paintAppends.push([paintAppend, [appendTo, element]]);
    }
    return contextItem;
}
//# sourceMappingURL=createAndProcessContextItem.function.js.map