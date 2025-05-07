import { TemplaterResult } from '../getTemplaterResult.function.js'
import { checkTagValueChange } from '../checkTagValueChange.function.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { ContextItem } from '../Context.types.js'
import { newSupportByTemplater } from './processTag.function.js'
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
          element: dom.marker,
          relative: appendTo, // ph.parentNode as Element,
        })
      } else {
        paintInsertBefores.push({
          element: dom.marker,
          relative: insertBefore as Text, // ph.parentNode as Element,
        })
      }
    }

    if(dom.domElement) {
      if(appendTo) {
        paintAppends.push({
          element: dom.domElement,
          relative: appendTo, // ph.parentNode as Element,
        })
      } else {
        paintInsertBefores.push({
          element: dom.domElement,
          relative: insertBefore as Text, // ph.parentNode as Element,
        })
      }
    }
  }

  return support
}
