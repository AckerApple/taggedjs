import { TemplaterResult } from '../getTemplaterResult.function.js'
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { paintAppend, paintAppends, paintBefore, paintCommands } from '../../render/paint.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { newSupportByTemplater } from '../../render/update/processTag.function.js'
import { AnySupport } from '../index.js'

export function processNewSubjectTag(
  templater: TemplaterResult,
  subject: ContextItem, // could be tag via result.tag
  ownerSupport: AnySupport, // owner
  appendTo?: Element,
  insertBefore?: Text,
): AnySupport {
  const support = newSupportByTemplater(templater, ownerSupport, subject)

  support.ownerSupport = ownerSupport

  const result = buildBeforeElement(
    support,
    appendTo,
    appendTo ? undefined : insertBefore,
  )

  for(const dom of result.dom) {
    if(dom.marker) {
      if(appendTo) {
        paintAppends.push([paintAppend, [appendTo, dom.marker]])
      } else {
        paintCommands.push([paintBefore, [insertBefore, dom.marker, 'subMarker']])
      }
    }

    if(dom.domElement) {
      if(appendTo) {
        paintAppends.push([paintAppend, [appendTo, dom.domElement, 'subAppendTo']])
      } else {
        paintCommands.push([paintBefore, [insertBefore, dom.domElement, 'subInsertBefore']])
      }
    }
  }

  return support
}
