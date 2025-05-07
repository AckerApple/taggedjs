// taggedjs-no-compile
import { paintAppends, paintInsertBefores } from "../../tag/paint.function.js";
import { addOneContext } from "../../tag/index.js";
import { empty } from "../../tag/ValueTypes.enum.js";
import { domProcessContextItem } from "./domProcessContextItem.function.js";
export function attachDynamicDom(value, context, support, // owner
counts, // used for animation stagger computing
depth, // used to indicate if variable lives within an owner's element
appendTo, insertBefore) {
    const marker = document.createTextNode(empty);
    const isWithinOwnerElement = depth > 0;
    const contextItem = addOneContext(value, context, isWithinOwnerElement);
    contextItem.placeholder = marker;
    if (appendTo) {
        paintAppends.push({
            relative: appendTo,
            element: marker,
        });
    }
    else {
        paintInsertBefores.push({
            relative: insertBefore,
            element: marker,
        });
    }
    domProcessContextItem(value, contextItem, support, counts, appendTo, insertBefore);
}
//# sourceMappingURL=attachDynamicDom.function.js.map