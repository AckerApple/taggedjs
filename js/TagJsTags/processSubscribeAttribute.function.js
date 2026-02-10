import { setNonFunctionInputValue } from "../index.js";
import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function.js";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function.js";
import { unsubscribeContext, checkToPaint, setupSubscribeCallbackProcessor } from "../tag/update/setupSubscribe.function.js";
import { processAttributeUpdate } from "./processAttributeUpdate.function.js";
export function processSubscribeAttribute(name, value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
element, _tagJsVar, // same as value
contextItem, ownerSupport) {
    // change how the delete occurs
    value.destroy = unsubscribeContext;
    const isSpecial = isSpecialAttr(name, element.tagName);
    const onOutput = function onSubValue(callbackValue, syncRun) {
        processNonDynamicAttr(name, callbackValue, element, setNonFunctionInputValue, isSpecial, contextItem);
        checkToPaint(syncRun);
    };
    const subContext = setupSubscribeCallbackProcessor(value.Observables, ownerSupport, onOutput, value, contextItem);
    contextItem.subContext = subContext;
    contextItem.value = value;
    contextItem.tagJsVar = value;
    value.processUpdate = function processAttributeUpdateWrap(value, contextItem2, ownerSupport) {
        return processAttributeUpdate(value, contextItem, ownerSupport, element, name, setNonFunctionInputValue);
    };
    return { subContext, onOutput };
}
//# sourceMappingURL=processSubscribeAttribute.function.js.map