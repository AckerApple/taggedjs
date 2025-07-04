import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { TagCounts } from'../TagCounts.type.js'
import { paintAppend, paintAppends } from '../../render/paint.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function processFirstTagResult(
  support: AnySupport,
  counts: TagCounts,
  appendTo: Element,
) {
  const result = buildBeforeElement(
    support,
    counts,
    appendTo,
    undefined,
  )

  for(const dom of result.dom) {
    if(dom.domElement) {
      paintAppends.push([paintAppend, [appendTo, dom.domElement]])
    }
    if(dom.marker) {
      paintAppends.push([paintAppend, [appendTo, dom.marker]])
    }
  }

  return support
}
