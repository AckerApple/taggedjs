import { HowToSet, howToSetStandAloneAttr, setNonFunctionInputValue } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { Attribute } from "../../interpolations/optimizers/ObjectNode.types.js"
import { SupportContextItem } from "../../index.js"

export function processAttributeArray(
  attrs: Attribute[],
  values: any[],
  domElement: HTMLElement,
  support: AnySupport,
  // contexts: ContextItem[],
  parentContext: ContextItem,
) {
  for (const attr of attrs) {
    const name = attr[0]
    const value = attr[1]
    const isSpecial = attr[2] || false // isSpecial2
    let howToSet: HowToSet = attr.length > 1 ? setNonFunctionInputValue : howToSetStandAloneAttr

    if(attr[3]) {
      howToSet = attr[3]
    }

    // const contexts = support.context.contexts
    const contexts = parentContext.contexts as ContextItem[]
    const newContext = processAttribute(
      name,
      value,
      values,
      domElement,
      support,
      howToSet,
      contexts,
      parentContext,
      isSpecial
    ) as ContextItem || undefined

    if (typeof newContext === 'object') {
      contexts.push(newContext as ContextItem)
      ++(parentContext as SupportContextItem).varCounter
    }
  }
}
