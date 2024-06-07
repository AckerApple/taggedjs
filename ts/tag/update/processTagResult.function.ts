import { Counts } from'../../interpolations/interpolateTemplate.js'
import { TagArraySubject } from'./processTagArray.js'
import { TagSubject } from '../../subject.types.js'
import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'

/** checks if previous support exists on subject or as a last global support. If first render, calls builder. Otherwise calls tagSupport.updateBy() */
export function processTagResult(
  tagSupport: TagSupport,
  subject: TagArraySubject | TagSubject | Function, // used for recording past and current value
  insertBefore: InsertBefore, // <template end interpolate />
  {
    counts,
  }: {
    counts: Counts
  },
) {
  // *if appears we already have seen
  const subjectTag = subject as TagSubject
  const lastSupport = subjectTag.tagSupport
  const prevSupport = lastSupport?.global.oldest || undefined
  const justUpdate = prevSupport
  
  if(prevSupport && justUpdate) {
    return processTagResultUpdate(tagSupport, subjectTag, prevSupport)
  }

  tagSupport.buildBeforeElement(insertBefore, {
    counts,
  })

  return tagSupport
}


function processTagResultUpdate(
  tagSupport: TagSupport,
  subject: TagSubject | ((x: BaseTagSupport | TagSupport) => TagSupport), // used for recording past and current value
  prevSupport: BaseTagSupport | TagSupport,
) {
  // components
  if(subject instanceof Function) {
    const newSupport = subject(prevSupport)
    prevSupport.updateBy(newSupport)
    // we have to store previous states somewhere, put on the function given
    ;(subject as unknown as TagSubject).tagSupport = newSupport
    return newSupport
  }

  prevSupport.updateBy(tagSupport)
  subject.tagSupport = tagSupport

  return tagSupport
}
