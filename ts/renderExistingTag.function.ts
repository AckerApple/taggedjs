import { Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { providersChangeCheck } from './provider.utils'
import { TemplaterResult, renderWithSupport } from './TemplaterResult.class'
import { TagSubject } from './Tag.utils'
import { isLikeTags } from './isLikeTags.function'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestTag: Tag, // existing tag already there
  newTemplater: TemplaterResult,
  tagSupport: BaseTagSupport,
  subject: TagSubject,
): Tag {
  const tag = subject.tag as Tag
  newTemplater.global = tag.tagSupport.templater.global

  if(!oldestTag.hasLiveElements) {
    throw new Error('1080 - should have live elements')
  }

  const preRenderCount = tagSupport.templater.global.renderCount
  providersChangeCheck(oldestTag)

  // When the providers were checked, a render to myself occurred and I do not need to re-render again
  const latestTag = tagSupport.templater.global.newest as Tag
  if(preRenderCount !== tagSupport.templater.global.renderCount) {
    oldestTag.updateByTag(latestTag)
    return latestTag
  }

  const oldTemplater = tagSupport.templater || newTemplater
  const toRedrawTag = subject.tag || oldTemplater.global.newest || oldTemplater.global.oldest // hmmmmmm, why not newest?
  const redraw = renderWithSupport(
    newTemplater.tagSupport,
    toRedrawTag,
    subject,
    oldestTag.ownerTag,
  )

  const oldest = tagSupport.templater.global.oldest || oldestTag
  redraw.tagSupport.templater.global.oldest = oldest

  if(isLikeTags(latestTag, redraw)) {
    subject.tag = redraw
    oldest.updateByTag(redraw)
  }

  return redraw
}
