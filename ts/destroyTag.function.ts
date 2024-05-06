import { TagSubject, WasTagSubject } from './subject.types'
import { TagSupport } from './TagSupport.class'

export function destroyTagMemory(
  oldTagSupport: TagSupport,
  subject: TagSubject,
) {
  // must destroy oldest which is tag with elements on stage
  const oldest = oldTagSupport.global.oldest as TagSupport
  oldest.destroy()

  destroyTagSupportPast(oldTagSupport)
  
  oldTagSupport.global.context = {}
}

export function destroyTagSupportPast(oldTagSupport: TagSupport) {
  delete oldTagSupport.global.oldest
  delete oldTagSupport.global.newest
}
