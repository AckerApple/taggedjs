// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"

export function domProcessContextItem(
  value: any,
  support: AnySupport,
  contextItem: ContextItem,
  appendTo?: Element,
  insertBefore?: Text
) {
  // how to handle value updates
  // contextItem.handler = tagValueUpdateHandler

  const subject = support.context  
  subject.locked = true

  processFirstSubjectValue(
    value,
    contextItem,
    support,
    appendTo,
    insertBefore,
  )

  delete subject.locked
  contextItem.value = value
}
