import { Tag } from "./Tag.class.js"
import { TagSubject } from "./Tag.utils.js"
import { runAfterRender, runBeforeRedraw } from "./tagRunner.js"
import { TemplaterResult } from "./templater.utils.js"

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

  const retag = templater.wrapper()
  
  templater.newest = retag
  tagSupport.newest = retag
  runAfterRender(oldest.tagSupport, oldest)
  ogTag.updateByTag(retag)
  // oldest.updateByTag(retag)

  existingSubject.set(templater)
  
  return []
}
