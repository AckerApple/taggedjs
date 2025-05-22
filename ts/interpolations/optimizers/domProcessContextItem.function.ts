// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/ContextItem.type.js"
import { TagCounts, TagGlobal } from "../../tag/index.js"
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

  const global = support.subject.global as TagGlobal
  global.locked = true

  processFirstSubjectValue(
    value,
    contextItem,
    support,
    counts,
    appendTo,
    insertBefore,
  )

  const global2 = support.subject.global as TagGlobal
  delete global2.locked
  contextItem.value = value
}
