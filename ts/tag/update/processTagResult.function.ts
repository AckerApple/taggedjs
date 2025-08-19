import { buildBeforeElement } from '../../render/buildBeforeElement.function.js'
import { paintAppend, paintAppends } from '../../render/paint.function.js'
import { AnySupport } from '../index.js'

export function processFirstTagResult(
  support: AnySupport,
  appendTo: Element,
) {
  const result = buildBeforeElement(
    support,
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
