import { Counts } from'../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../Support.class.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'
import { ContextItem } from '../Context.types.js'
import { buildBeforeElement } from '../buildBeforeElement.function.js'
import { checkTagValueChange } from '../index.js'

export function processReplaceTagResult(
  support: AnySupport,
  counts: Counts,
  contextItem: ContextItem,
) {
  contextItem.checkValueChange = checkTagValueChange
  const ph = contextItem.placeholder as Text

  const result = buildBeforeElement(
    support,
    undefined,
    ph,
    {counts},
  )

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

  const result = buildBeforeElement(support, appendTo, undefined, {counts})
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
