// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { TagCounts } from "../../tag/index.js"
import { tagValueUpdateHandler } from "../../tag/update/tagValueUpdateHandler.function.js"


export function domProcessContextItem(
  value: any,
  support: AnySupport,
  contextItem: ContextItem,
  counts: TagCounts, // used for animation stagger computing
  appendTo?: Element,
  insertBefore?: Text
) {
  // how to handle value updates
  contextItem.handler = tagValueUpdateHandler

  const subject = support.subject  
  subject.locked = true

  processFirstSubjectValue(
    value,
    contextItem,
    support,
    counts,
    appendTo,
    insertBefore,
  )

  delete subject.locked
  contextItem.value = value
}
