// taggedjs-no-compile
import { paintAppend, paintAppends, paintBefore, paintCommands } from "../../render/paint.function.js";
import { addOneContext } from "../../render/index.js";
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
            processor: paintAppend,
            args: [appendTo, marker],
        });
    }
    else {
        paintCommands.push({
            processor: paintBefore,
            args: [insertBefore, marker],
        });
    }
    domProcessContextItem(value, support, contextItem, counts, appendTo, insertBefore);
}
//# sourceMappingURL=attachDynamicDom.function.js.map