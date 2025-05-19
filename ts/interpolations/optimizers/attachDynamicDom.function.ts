// taggedjs-no-compile

import { paintAppend, paintAppends, paintBefore, paintCommands } from "../../render/paint.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/Context.types.js"
import { addOneContext } from "../../render/index.js"
import { empty } from "../../tag/ValueTypes.enum.js"
import { Counts } from "../interpolateTemplate.js"
import { domProcessContextItem } from "./domProcessContextItem.function.js"

export function attachDynamicDom(
  value: any,
  context: ContextItem[],
  support: AnySupport, // owner
  counts: Counts, // used for animation stagger computing
  depth: number, // used to indicate if variable lives within an owner's element
  appendTo?: Element,
  insertBefore?: Text
) {  
  const marker = document.createTextNode(empty)
  const isWithinOwnerElement = depth > 0
  const contextItem = addOneContext(
    value,
    context,
    isWithinOwnerElement,
  )

  contextItem.placeholder = marker

  if(appendTo) {
    paintAppends.push({
      processor: paintAppend,
      args: [appendTo, marker],
    })
  } else {
    paintCommands.push({
      processor: paintBefore,
      args: [insertBefore, marker],
    })
  }

  domProcessContextItem(
    value,
    support,
    contextItem,
    counts,
    appendTo,
    insertBefore,
  )
}
