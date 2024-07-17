import { Counts } from'../../interpolations/interpolateTemplate.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { paintAppends, paintInsertBefores } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'

export function processReplaceTagResult(
  support: AnySupport,
  counts: Counts,
  subjectTag: TagSubject,
) {
  let insertIndex = paintInsertBefores.length

  const result = support.buildBeforeElement(undefined, {counts})
  const global = subjectTag.global
  const ph = global.placeholder as Text

  let domIndex = -1
  const domLen = result.dom.length - 1
  while(domIndex++ < domLen) {
    const dom = result.dom[domIndex]
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

  let index = -1
  const len = result.subs.length - 1
  // ++painting.locks
  while(index++ < len) {
    subscribeToTemplate(result.subs[index])
  }
  // --painting.locks

  return support
}

export function processFirstTagResult(
  support: AnySupport,
  counts: Counts,
  subjectTag: TagSubject,
  appendTo: Element,
) {
  let appendIndex = paintAppends.length

  const result = support.buildBeforeElement(appendTo, {counts})
  const global = subjectTag.global
  const ph = global.placeholder as Text

  let domIndex = -1
  const domLen = result.dom.length - 1
  while(domIndex++ < domLen) {
    const dom = result.dom[domIndex]
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

  let index = -1
  const len = result.subs.length - 1
  // ++painting.locks
  while(index++ < len) {
    subscribeToTemplate(result.subs[index])
  }
  // --painting.locks

  return support
}
