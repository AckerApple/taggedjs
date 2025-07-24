import { AnySupport, TemplateValue, ContextItem } from "../index.js";
import { howToSetFirstInputValue } from "../interpolations/attributes/howToSetInputValue.function.js";
import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function.js";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { unsubscribeContext, checkToPaint, setupSubscribeCallbackProcessor } from "../tag/update/setupSubscribe.function.js";
import { processAttributeUpdate } from "./processAttributeUpdate.function.js";
import { SubscribeValue } from "./subscribe.function.js";
import { TagJsVar } from "./tagJsVar.type.js";


export function processSubscribeAttribute(
  name: string,
  value: SubscribeValue, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: Element,
  _tagJsVar: TagJsVar, // same as value
  contextItem: AttributeContextItem,
  ownerSupport: AnySupport
) {
  // change how the delete occurs
  value.delete = unsubscribeContext

  const isSpecial = isSpecialAttr(name)
  const onOutput = function onSubValue(
    callbackValue: TemplateValue,
    syncRun: boolean
  ) {
    processNonDynamicAttr(
      name,
      callbackValue as any,
      element,
      howToSetFirstInputValue,
      isSpecial
    )

    checkToPaint(syncRun)
  }

  const subContext = setupSubscribeCallbackProcessor(
    value.Observables,
    ownerSupport,
    onOutput,
    value
  );

  contextItem.subContext = subContext

  contextItem.value = value
  contextItem.tagJsVar = value

  contextItem.tagJsVar.processUpdate = function processAttributeUpdateWrap(
    value: TemplateValue,
    contextItem2: ContextItem,
    ownerSupport: AnySupport
  ) {
    processAttributeUpdate(value, contextItem, ownerSupport, element, name)
  }

  return { subContext, onOutput };
}
