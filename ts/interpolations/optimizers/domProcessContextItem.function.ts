// taggedjs-no-compile

import { processFirstSubjectValue } from "../../tag/update/processFirstSubjectValue.function.js"
import { AnySupport } from "../../tag/AnySupport.type.js"
import { ContextItem } from "../../tag/Context.types.js"
import { TagGlobal } from "../../tag/index.js"
import { Counts } from "../interpolateTemplate.js"
import { updateExistingValue } from "../../tag/update/updateExistingValue.function.js"


export function domProcessContextItem(
  value: any,
  contextItem: ContextItem,
  support: AnySupport,
  counts: Counts, // used for animation stagger computing
  appendTo?: Element,
  insertBefore?: Text
) {
  // how to handle value updates
  contextItem.handler = updateExistingValue

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
