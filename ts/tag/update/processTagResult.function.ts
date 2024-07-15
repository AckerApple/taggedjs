import { Counts } from'../../interpolations/interpolateTemplate.js'
import { TagArraySubject } from'./processTagArray.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { paint, paintAppends, painting } from '../paint.function.js'
import { subscribeToTemplate } from '../../interpolations/subscribeToTemplate.function.js'

/** checks if previous support exists on subject or as a last global support. If first render, calls builder. Otherwise calls support.updateBy()
 * Being used for FIRST and UPDATE renders
*/
export function processTagResult(
  support: AnySupport,
  subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
  {
    counts,
  }: {
    counts: Counts
  },
) {
  // *if appears we already have seen
  const subjectTag = subject as TagSubject
  const lastSupport = subjectTag.support
  const prevSupport = lastSupport?.subject.global.oldest || undefined
  const justUpdate = prevSupport
  
  if(prevSupport && justUpdate) {
    return processTagResultUpdate(support, subjectTag, prevSupport)
  }

  return processFirstTagResult(support, counts, subjectTag)
}

export function processFirstTagResult(
  support: AnySupport,
  counts: Counts,
  subjectTag: TagSubject,
) {
  let appendIndex = paintAppends.length

  const result = support.buildBeforeElement({counts})
  const global = subjectTag.global
  const ph = global.placeholder as Text

  let domIndex = -1
  const domLen = result.dom.length - 1
  while(domIndex++ < domLen) {
    const dom = result.dom[domIndex]
    if(dom.domElement) {
      paintAppends.splice(appendIndex++, 0, {
        element: dom.domElement,
        relative: ph      
      })
    }
    if(dom.marker) {
      paintAppends.splice(appendIndex++, 0, {
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

function processTagResultUpdate(
  support: AnySupport,
  subject: TagSubject | ((x: BaseSupport | Support) => Support), // used for recording past and current value
  prevSupport: BaseSupport | Support,
) {
  // components
  if(subject instanceof Function) {
    const newSupport = subject(prevSupport)
    prevSupport.updateBy(newSupport)
    // we have to store previous states somewhere, put on the function given
    ;(subject as unknown as TagSubject).support = newSupport
    return newSupport
  }

  subject.global.oldest.updateBy(support)
  subject.support = support as Support

  return support
}
