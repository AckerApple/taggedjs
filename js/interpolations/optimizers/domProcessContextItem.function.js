// taggedjs-no-compile
import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js";
export function domProcessContextItem(value, support, contextItem, counts, // used for animation stagger computing
appendTo, insertBefore) {
    // how to handle value updates
    // contextItem.handler = tagValueUpdateHandler
    const subject = support.context;
    subject.locked = true;
    processFirstSubjectValue(value, contextItem, support, counts, appendTo, insertBefore);
    delete subject.locked;
    contextItem.value = value;
}
//# sourceMappingURL=domProcessContextItem.function.js.map