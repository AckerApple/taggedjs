import { AnySupport, ContextItem, TemplateValue } from "../index.js";
import { HowToSet } from "../interpolations/attributes/howToSetInputValue.function.js";
import { isSpecialAttr } from "../interpolations/attributes/isSpecialAttribute.function.js";
import { processNonDynamicAttr } from "../interpolations/attributes/processNameValueAttribute.function.js";
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js";
import { checkSimpleValueChange, deleteSimpleAttribute } from "./getSimpleTagVar.function.js";
import { processAttributeUpdate } from "./processAttributeUpdate.function.js";
import { TagJsTag } from "./TagJsTag.type.js";

/** init runner */
export function processSimpleAttribute(
  name: string,
  value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  tagJsVar: TagJsTag,
  contextItem: AttributeContextItem,
  _ownerSupport: AnySupport,
  howToSet: HowToSet,
) {
  // function swapping
  tagJsVar.destroy = deleteSimpleAttribute
  tagJsVar.hasValueChanged = checkSimpleValueChange
  tagJsVar.processUpdate = (
    value: TemplateValue,
    contextItem: ContextItem,
    ownerSupport: AnySupport,
  ) => {
    return processAttributeUpdate(
      value,
      contextItem,
      ownerSupport,
      element,
      name,
      howToSet,
    )
  }

  const isSpecial = isSpecialAttr(name, element.tagName)
  processNonDynamicAttr(
    name,
    value,
    element,
    howToSet,
    isSpecial,
    contextItem,
  )

  contextItem.tagJsVar = tagJsVar
}
