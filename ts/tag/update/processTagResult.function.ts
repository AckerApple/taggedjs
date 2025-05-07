import { buildBeforeElement } from '../buildBeforeElement.function.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { paintAppends } from '../paint.function.js'
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
        element: dom.domElement,
        relative: appendTo,
      })
    }
    if(dom.marker) {
      paintAppends.splice(appendIndex++, 0, {
        element: dom.marker,
        relative: appendTo,
      })
    }
  }

  return support
}
