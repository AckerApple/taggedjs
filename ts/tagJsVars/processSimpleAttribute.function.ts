import { AnySupport, ContextItem, TemplateValue } from "../index.js";
import { howToSetFirstInputValue } from "../interpolations/attributes/howToSetInputValue.function.js";
import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function.js";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { checkSimpleValueChange, deleteSimpleAttribute } from "./getSimpleTagVar.function.js";
import { processAttributeUpdate } from "./processAttributeUpdate.function.js";
import { TagJsVar } from "./tagJsVar.type.js";

/** init runner */
export function processSimpleAttribute(
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  tagJsVar: TagJsVar,
  contextItem: AttributeContextItem,
) {
  // function swapping
  tagJsVar.destroy = deleteSimpleAttribute
  tagJsVar.checkValueChange = checkSimpleValueChange
  tagJsVar.processUpdate = (
    value: TemplateValue,
    contextItem: ContextItem,
    ownerSupport: AnySupport,
  ) => {
    return processAttributeUpdate(value, contextItem, ownerSupport, element, name)
  }

  const isSpecial = isSpecialAttr(name)
  processNonDynamicAttr(
    name,
    value,
    element,
    howToSetFirstInputValue,
    isSpecial,
    contextItem,
  )

  contextItem.tagJsVar = tagJsVar
}
