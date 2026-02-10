import { ContextItem, TemplaterResult, AnySupport, SupportContextItem, HowToSet, TagJsComponent } from "../index.js";
import { Callback } from "../interpolations/attributes/bindSubjectCallback.function.js";
import { Subject } from "../subject/index.js";
import { SubscribeValue } from "./subscribe.function.js";
import { TagJsTag } from "./TagJsTag.type.js";
import { valueToTagJsVar } from "./valueToTagJsVar.function.js";

export function processAttributeUpdate(
  value: string | number | boolean | null | TagJsComponent<any> | SubscribeValue | TemplaterResult | (TagJsComponent<any> | TemplaterResult)[] | Subject<unknown> | Callback | null | undefined,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  element: Element,
  name: string,
  howToSet: HowToSet,
) {
  const oldTag = contextItem.tagJsVar // contextItem.tagJsVar as TagJsTag
  const tagValue = value as TagJsTag | undefined

  const checkResult = oldTag.hasValueChanged(
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
      ownerSupport,
      howToSet,
    )

    contextItem.tagJsVar = newTagVar
    return
  }
}
