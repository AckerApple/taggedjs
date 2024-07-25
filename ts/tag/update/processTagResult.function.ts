import { Counts } from'../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../Support.class.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'
import { ContextItem } from '../Tag.class.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'

export function processReplaceTagResult(
  support: AnySupport,
  counts: Counts,
  subjectTag: ContextItem,
) {
  let insertIndex = paintInsertBefores.length

  const result = buildBeforeElement(support, undefined, {counts})
  const global = subjectTag.global
  const ph = global.placeholder as Text

  for(const dom of result.dom) {
    if(dom.domElement) {
      paintInsertBefores.splice(insertIndex++, 0, {
        element: dom.domElement,
        relative: ph      
      })
    }
    if(dom.marker) {
      paintInsertBefores.splice(insertIndex++, 0, {
        element: dom.marker,
        relative: ph,
      })
    }
  }

  const subs = result.subs
  for(const sub of subs) {
    subscribeToTemplate(sub)
  }

  return support
}

export function processFirstTagResult(
  support: AnySupport,
  counts: Counts,
  appendTo: Element,
) {
  let appendIndex = paintAppends.length

  const result = buildBeforeElement(support, appendTo, {counts})
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

  const subs = result.subs
  for(const sub of subs) {
    subscribeToTemplate(sub)
  }

  return support
}
