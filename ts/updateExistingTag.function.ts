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
  runBeforeRedraw(oldest.tagSupport, oldest)

  const retag = templater.wrapper()
  
  // move my props onto tagSupport
  tagSupport.latestProps = retag.tagSupport.props
  tagSupport.latestClonedProps = retag.tagSupport.clonedProps
  // tagSupport.latestClonedProps = retag.tagSupport.latestClonedProps
  tagSupport.memory  = retag.tagSupport.memory

  retag.tagSupport = tagSupport

  templater.newest = retag
  tagSupport.newest = retag
  runAfterRender(oldest.tagSupport, oldest)
  ogTag.updateByTag(retag)

  existingSubject.set(templater)
  
  return
}
