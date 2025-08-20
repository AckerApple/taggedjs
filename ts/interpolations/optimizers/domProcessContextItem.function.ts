// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
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

  contextItem.element = contextItem.element || appendTo as HTMLElement
  setContextInCycle(contextItem)

  processFirstSubjectValue(
    value,
    contextItem,
    support,
    appendTo,
    insertBefore,
  )

  removeContextInCycle()

  delete subject.locked
  contextItem.value = value
}
