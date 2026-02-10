import { removeContextInCycle, setContextInCycle } from "../../tag/cycles/setContextInCycle.function.js";
export function domProcessContextItem(value, support, contextItem, appendTo, insertBefore) {
    const subject = support.context;
    subject.locked = 3;
    contextItem.target = contextItem.target || appendTo;
    setContextInCycle(contextItem);
    if (contextItem.inputsHandler) {
        const props = support.propsConfig;
        contextItem.inputsHandler(props);
    }
    contextItem.tagJsVar.processInit(value, contextItem, support, insertBefore, appendTo);
    removeContextInCycle();
    contextItem.value = value;
    delete subject.locked;
}
//# sourceMappingURL=domProcessContextItem.function.js.map