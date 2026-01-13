import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { removeContextInCycle, setContextInCycle } from "../../tag/cycles/setContextInCycle.function.js"

export function domProcessContextItem(
  value: any,
  support: AnySupport,
  contextItem: ContextItem,
  appendTo?: Element,
  insertBefore?: Text
) {
  const subject = support.context  
  subject.locked = 3

  contextItem.target = contextItem.target || appendTo as HTMLElement
  setContextInCycle(contextItem)

  contextItem.tagJsVar.processInit(
    value,
    contextItem,
    support,
    insertBefore,
    appendTo,
  )

  removeContextInCycle()

  contextItem.value = value

  delete subject.locked
}
