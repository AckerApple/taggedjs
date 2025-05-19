import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { paintAppend, paintAppends } from '../../render/paint.function.js'
import { ContextItem } from '../Context.types.js'
import { checkTagValueChange } from '../index.js'
import { AnySupport } from '../AnySupport.type.js'

export function processReplaceTagResult(
  support: AnySupport,
  counts: Counts,
  contextItem: ContextItem,
) {
  contextItem.checkValueChange = checkTagValueChange
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
  counts: Counts,
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
