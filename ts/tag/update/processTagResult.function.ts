import { Counts } from'../../interpolations/interpolateTemplate.js'
import { TagArraySubject } from'./processTagArray.js'
import { TagSubject } from '../../subject.types.js'
import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { paintAppends } from '../paint.function.js'

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
  const newFragment = support.buildBeforeElement(undefined, {counts})
  const placeholder = subjectTag.global.placeholder as Text

  paintAppends.push(() => {  
    const parentNode = placeholder.parentNode as ParentNode
    parentNode.insertBefore(newFragment, placeholder)
  })

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

  // ??? - new removed
  // prevSupport.updateBy(support)
  subject.global.oldest.updateBy(support)
  subject.support = support as Support

  return support
}
