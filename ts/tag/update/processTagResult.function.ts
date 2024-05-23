import { Counts } from '../../interpolations/interpolateTemplate'
import { TagArraySubject } from './processTagArray'
import { TagSubject } from '../../subject.types'
import { InsertBefore } from '../../interpolations/Clones.type'
import { TagSupport } from '../TagSupport.class'

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
}


function processTagResultUpdate(
  tagSupport: TagSupport,
  subject: TagSubject | ((x: TagSupport) => TagSupport), // used for recording past and current value
  prevSupport: TagSupport,
) {
  // components
  if(subject instanceof Function) {
    const newSupport = subject(prevSupport)
    prevSupport.updateBy(newSupport)
    // we have to store previous states somewhere, put on the function given
    ;(subject as unknown as TagSubject).tagSupport = newSupport
    return
  }

  prevSupport.updateBy(tagSupport)
  subject.tagSupport = tagSupport

  return
}
