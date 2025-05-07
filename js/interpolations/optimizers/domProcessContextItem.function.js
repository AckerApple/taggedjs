// taggedjs-no-compile
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js";
import { updateExistingValue } from "../../tag/update/updateExistingValue.function.js";
export function domProcessContextItem(value, contextItem, support, counts, // used for animation stagger computing
appendTo, insertBefore) {
    // how to handle value updates
    contextItem.handler = updateExistingValue;
    const global = support.subject.global;
    global.locked = true;
    processFirstSubjectValue(value, contextItem, support, counts, appendTo, insertBefore);
    const global2 = support.subject.global;
    delete global2.locked;
    contextItem.value = value;
}
//# sourceMappingURL=domProcessContextItem.function.js.map