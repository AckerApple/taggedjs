import { Tag } from './Tag.class'
import { TagSubject } from './Tag.utils'
import { runAfterRender, runBeforeRedraw } from './tagRunner'
import { TemplaterResult } from './templater.utils'

export function updateExistingTag(
  templater: TemplaterResult,
  ogTag: Tag,
  existingSubject: TagSubject,
) {
  const tagSupport = ogTag.tagSupport
  const oldest = tagSupport.oldest as Tag
  const newest = tagSupport.newest as Tag

  // runBeforeRedraw(oldest.tagSupport, newest || oldest)
  runBeforeRedraw(oldest.tagSupport, oldest)

  const retag = templater.wrapper(tagSupport)
  
  templater.newest = retag
  tagSupport.newest = retag
  runAfterRender(oldest.tagSupport, oldest)
  ogTag.updateByTag(retag)
  // oldest.updateByTag(retag)

  existingSubject.set(templater)
  
  return []
}
