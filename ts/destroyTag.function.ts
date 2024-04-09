import { TagSubject } from './Tag.utils'
import { Tag } from './Tag.class'
import { TagSupport } from './TagSupport.class'

export function destroyTagMemory(
  tag: Tag,
  subject: TagSubject,
) {
  const oldTagSupport = tag.tagSupport
  
  if(subject != oldTagSupport.subject) {
    throw new Error('fff - subjects do not match')
  }

  delete subject.tag
  delete oldTagSupport.subject.tag // TODO: this line maybe not needed

  // must destroy oldest which is tag with elements on stage
  const oldest = oldTagSupport.templater.global.oldest as Tag
  oldest.destroy()

  destroyTagSupportPast(oldTagSupport)
  
  oldTagSupport.templater.global.context = {}
}

export function destroyTagSupportPast(oldTagSupport: TagSupport) {
  delete oldTagSupport.templater.global.oldest
  delete oldTagSupport.templater.global.newest
}
