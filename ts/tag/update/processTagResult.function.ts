import { Counts } from'../../interpolations/interpolateTemplate.js'
import { TagArraySubject } from'./processTagArray.js'
import { TagSubject } from '../../subject.types.js'
import { BaseSupport, Support } from '../Support.class.js'

/** checks if previous support exists on subject or as a last global support. If first render, calls builder. Otherwise calls support.updateBy() */
export function processTagResult(
  support: Support,
  subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
  {
    counts,
  }: {
    counts: Counts
  },
  fragment?: DocumentFragment
) {
  // *if appears we already have seen
  const subjectTag = subject as TagSubject
  const lastSupport = subjectTag.support
  const prevSupport = lastSupport?.subject.global.oldest || undefined
  const justUpdate = prevSupport
  
  if(prevSupport && justUpdate) {
    return processTagResultUpdate(support, subjectTag, prevSupport)
  }

  const newFragment = support.buildBeforeElement(undefined, {counts})
  //if(fragment) {
  //  fragment.appendChild(newFragment)
  //} else {
    const placeholder = (subject as TagSubject).global.placeholder as Text
    const parentNode = placeholder.parentNode as ParentNode
    parentNode.insertBefore(newFragment, placeholder)
  //}

  return support
}


function processTagResultUpdate(
  support: Support,
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
  subject.support = support

  return support
}
