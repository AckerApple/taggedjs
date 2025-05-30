import { TemplaterResult } from '../getTemplaterResult.function.js'
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { newSupportByTemplater } from '../../render/update/processTag.function.js'
import type { TagCounts } from '../../tag/TagCounts.type.js'
import { AnySupport } from '../AnySupport.type.js'

export function processNewSubjectTag(
  templater: TemplaterResult,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owner
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport {
  const support = newSupportByTemplater(templater, ownerSupport, subject)

  support.ownerSupport = ownerSupport

  const result = buildBeforeElement(
    support,
    counts,
    appendTo,
    appendTo ? undefined : insertBefore,
  )

  for(const dom of result.dom) {
    if(dom.marker) {
      if(appendTo) {
        paintAppends.push([paintAppend, [appendTo, dom.marker]])
      } else {
        paintCommands.push([paintBefore, [insertBefore, dom.marker]])
      }
    }

    if(dom.domElement) {
      if(appendTo) {
        paintAppends.push([paintAppend, [appendTo, dom.domElement]])
      } else {
        paintCommands.push([paintBefore, [insertBefore, dom.domElement]])
      }
    }
  }

  return support
}
