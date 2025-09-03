import { DomObjectElement } from "../../interpolations/optimizers/ObjectNode.types.js"
import { paintAppends, paintAppend, paintCommands, paintBefore } from "../paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { processAttributeArray } from "./processAttributeArray.function.js"

export function attachDomElement(
  domElement: HTMLElement,
  node: DomObjectElement,
  values: any[],
  support: AnySupport,
  parentContext: ContextItem,
  appendTo: Element | undefined,
  insertBefore: Text | undefined,
): ContextItem[] {
  const attributeContexts: ContextItem[] = []
  
  // attributes that may effect style, come first for performance
  if (node.at) {
    processAttributeArray(
      node.at,
      values,
      domElement,
      support,
      // contexts,
      parentContext,
      attributeContexts,
    )
  }

  if (appendTo) {
    paintAppends.push([paintAppend, [appendTo, domElement]])
  } else {
    paintCommands.push([paintBefore, [insertBefore, domElement]])
  }
  
  return attributeContexts
}
