import { paintAppends, paintAppend, paintCommands, paintBefore } from "../paint.function.js";
import { processAttributeArray } from "./processAttributeArray.function.js";
export function attachDomElement(domElement, node, values, support, parentContext, appendTo, insertBefore) {
    // attributes that may effect style, come first for performance
    if (node.at) {
        processAttributeArray(node.at, values, domElement, support, 
        // contexts,
        parentContext);
    }
    if (appendTo) {
        paintAppends.push([paintAppend, [appendTo, domElement, 'appendToAttachDomElement']]);
    }
    else {
        paintCommands.push([paintBefore, [insertBefore, domElement, 'insertBeforeAttachDomElement']]);
    }
}
//# sourceMappingURL=attachDomElement.function.js.map