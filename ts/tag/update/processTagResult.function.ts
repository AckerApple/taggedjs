import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { TagCounts } from'../TagCounts.type.js'
import { paintAppend, paintAppends } from '../../render/paint.function.js'
import { ContextItem } from '../ContextItem.type.js'
import { AnySupport } from '../AnySupport.type.js'

export function processReplaceTagResult(
  support: AnySupport,
  counts: TagCounts,
  contextItem: ContextItem,
) {
  const ph = contextItem.placeholder as Text

  buildBeforeElement(
    support,
    counts,
    undefined, // element for append child
    ph, // placeholder
  )

  return support
}

export function processFirstTagResult(
  support: AnySupport,
  counts: TagCounts,
  appendTo: Element,
) {
  let appendIndex = paintAppends.length

  const result = buildBeforeElement(
    support,
    counts,
    appendTo,
    undefined,
  )

  for(const dom of result.dom) {
    if(dom.domElement) {
      paintAppends.splice(appendIndex++, 0, {
        args: [appendTo, dom.domElement],
        processor: paintAppend,
      })
    }
    if(dom.marker) {
      paintAppends.splice(appendIndex++, 0, {
        args: [appendTo, dom.marker],
        processor: paintAppend,
      })
    }
  }

  return support
}
