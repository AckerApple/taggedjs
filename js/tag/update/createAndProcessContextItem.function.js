// taggedjs-no-compile
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js';
import { domProcessContextItem } from '../../interpolations/optimizers/domProcessContextItem.function.js';
import { empty } from '../ValueTypes.enum.js';
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js';
/** Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(value, ownerSupport, counts, insertBefore, // used during updates
appendTo) {
    const element = document.createTextNode(empty);
    const contextItem = {
        value,
        tagJsVar: valueToTagJsVar(value),
        withinOwnerElement: false,
        placeholder: element,
    };
    if (!appendTo) {
        paintCommands.push([paintBefore, [insertBefore, element]]);
    }
    domProcessContextItem(value, ownerSupport, contextItem, counts, appendTo, insertBefore);
    if (appendTo) {
        paintAppends.push([paintAppend, [appendTo, element]]);
    }
    return contextItem;
}
//# sourceMappingURL=createAndProcessContextItem.function.js.map