import { removeContextInCycle, setContextInCycle } from "../../tag/cycles/setContextInCycle.function.js";
export function domProcessContextItem(value, support, contextItem, appendTo, insertBefore) {
    const subject = support.context;
    subject.locked = 3;
    contextItem.element = contextItem.element || appendTo;
    setContextInCycle(contextItem);
    contextItem.tagJsVar.processInit(value, contextItem, support, insertBefore, appendTo);
    removeContextInCycle();
    contextItem.value = value;
    delete subject.locked;
}
//# sourceMappingURL=domProcessContextItem.function.js.map