import { DomObjectElement } from "../../interpolations/optimizers/ObjectNode.types.js"
import { HowToSet, howToSetFirstInputValue, howToSetStandAloneAttr } from "../../interpolations/attributes/howToSetInputValue.function.js"
import { paintAppends, paintAppend, paintCommands, paintBefore } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { processAttribute } from "../attributes/processAttribute.function.js"
import { ContextItem } from "../../tag/ContextItem.type.js"

export function attachDomElement(
  domElement: HTMLElement,
  node: DomObjectElement,
  values: any[],
  support: AnySupport,
  contexts: ContextItem[],
  parentContext: ContextItem,
  appendTo: Element | undefined,
  insertBefore: Text | undefined,
): ContextItem[] {
  const attributeContexts: ContextItem[] = []
  
  // attributes that may effect style, come first for performance
  if (node.at) {
    for (const attr of node.at) {      
      const name = attr[0]
      const value = attr[1]
      const isSpecial = attr[2] || false
      const howToSet: HowToSet = attr.length > 1 ? howToSetFirstInputValue : howToSetStandAloneAttr

      const newContext = processAttribute(
        values,
        name,
        domElement,
        support,
        howToSet,
        contexts,
        parentContext,
        isSpecial,
        value,
      )

      if(typeof newContext === 'object') {
        attributeContexts.push(newContext as ContextItem)
      }
    }
  }

  if (appendTo) {
    paintAppends.push([paintAppend, [appendTo, domElement]])
  } else {
    paintCommands.push([paintBefore, [insertBefore, domElement]])
  }
  
  return attributeContexts
}