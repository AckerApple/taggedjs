// taggedjs-no-compile
import { paintAppend, paintAppends, paintBefore, paintCommands } from "../../render/paint.function.js";
import { addOneContext } from "../../render/addOneContext.function.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { domProcessContextItem } from "./domProcessContextItem.function.js";
export function attachDynamicDom(value, contexts, support, // owner
parentContext, depth, // used to indicate if variable lives within an owner's element
appendTo, insertBefore) {
    const marker = document.createTextNode(empty);
    const isWithinOwnerElement = depth > 0;
    const contextItem = addOneContext(value, contexts, isWithinOwnerElement, parentContext);
    contextItem.placeholder = marker;
    contextItem.element = appendTo;
    if (appendTo) {
        paintAppends.push([paintAppend, [appendTo, marker]]);
    }
    else {
        paintCommands.push([
            paintBefore, [insertBefore, marker, 'attachDynamicDom.attachDynamicDom']
        ]);
    }
    domProcessContextItem(value, support, contextItem, appendTo, insertBefore);
    return contextItem;
}
//# sourceMappingURL=attachDynamicDom.function.js.map