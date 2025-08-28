import { ContextItem, Tag, TemplaterResult, AnySupport, SupportContextItem } from "../index.js";
import { Callback } from "../interpolations/attributes/bindSubjectCallback.function.js";
import { Subject } from "../subject/index.js";
import { SubscribeValue } from "./subscribe.function.js";
import { TagJsVar } from "./tagJsVar.type.js";
import { valueToTagJsVar } from "./valueToTagJsVar.function.js";

export function processAttributeUpdate(
  value: string | number | boolean | Tag | SubscribeValue | TemplaterResult | (Tag | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  element: Element,
  name: string,
) {
  // const oldValue = contextItem.value as TagJsVar
  // const oldTag2 = valueToTagJsVar(oldValue) // contextItem.tagJsVar as TagJsVar
  const oldTag = contextItem.tagJsVar // contextItem.tagJsVar as TagJsVar
  const tagValue = value as TagJsVar | undefined

  const checkResult = oldTag.checkValueChange(
    tagValue,
    contextItem as SupportContextItem, // todo: weird typing should just be ContextItem
    ownerSupport,
  )

  if (checkResult > 0) {
    oldTag.destroy(contextItem, ownerSupport)
    element.removeAttribute(name)

    const newTagVar = valueToTagJsVar(value)
    newTagVar.isAttr = true

    newTagVar.processInitAttribute(
      name,
      value,
      element as HTMLElement,
      newTagVar,
      contextItem,
      ownerSupport
    )

    contextItem.tagJsVar = newTagVar
  }
}
