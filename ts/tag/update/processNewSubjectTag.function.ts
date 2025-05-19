import { TemplaterResult } from '../getTemplaterResult.function.js'
import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import { ContextItem } from '../Context.types.js'
import { newSupportByTemplater } from '../../render/update/processTag.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../AnySupport.type.js'

export function processNewSubjectTag(
  templater: TemplaterResult,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owner
  counts: Counts,
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport {
  subject.checkValueChange = checkTagValueChange
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
        paintAppends.push({
          args: [appendTo, dom.marker],
          processor: paintAppend,
        })
      } else {
        paintCommands.push({
          processor: paintBefore,
          args: [insertBefore, dom.marker],
        })
      }
    }

    if(dom.domElement) {
      if(appendTo) {
        paintAppends.push({
          args: [appendTo, dom.domElement],
          processor: paintAppend,
        })
      } else {
        paintCommands.push({
          processor: paintBefore,
          args: [insertBefore, dom.domElement],
        })
      }
    }
  }

  return support
}
