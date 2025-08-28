import { HowToSet, howToSetFirstInputValue, howToSetStandAloneAttr } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { Attribute } from "../../interpolations/optimizers/ObjectNode.types.js"

export function processAttributeArray(
  attrs: Attribute[] & [string, any, boolean][],
  values: any[],
  domElement: HTMLElement,
  support: AnySupport,
  // contexts: ContextItem[],
  parentContext: ContextItem,
  attributeContexts: ContextItem[],
) {
  for (const attr of attrs) {
    const name = attr[0]
    const value = attr[1]
    const isSpecial = attr[2] || false
    const howToSet: HowToSet = attr.length > 1 ? howToSetFirstInputValue : howToSetStandAloneAttr

    const newContext = processAttribute(
      name,
      value,
      values,
      domElement,
      support,
      howToSet,
      support.context.contexts,
      parentContext,
      isSpecial
    )

    if (typeof newContext === 'object') {
      attributeContexts.push(newContext as ContextItem)
    }
  }
}
