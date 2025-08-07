// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from "../../render/paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { addOneContext } from "../../render/addOneContext.function.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { domProcessContextItem } from "./domProcessContextItem.function.js"

export function attachDynamicDom(
  value: any,
  contexts: ContextItem[],
  support: AnySupport, // owner
  parentContext: ContextItem,
  depth: number, // used to indicate if variable lives within an owner's element
  appendTo?: Element,
  insertBefore?: Text
) {  
  const marker = document.createTextNode(empty)
  const isWithinOwnerElement = depth > 0
  const contextItem = addOneContext(
    value,
    contexts,
    isWithinOwnerElement,
    parentContext,
  )

  contextItem.placeholder = marker

  if(appendTo) {
    paintAppends.push([paintAppend, [appendTo, marker]])
  } else {
    paintCommands.push([paintBefore, [insertBefore, marker]])
  }

  domProcessContextItem(
    value,
    support,
    contextItem,
    appendTo,
    insertBefore,
  )

  return contextItem
}
