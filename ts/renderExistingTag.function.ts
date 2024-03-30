import { Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { hasTagSupportChanged } from './hasTagSupportChanged.function'
import { providersChangeCheck } from './provider.utils'
import { TemplaterResult } from './TemplaterResult.class'
import { TagSubject, redrawTag } from './Tag.utils'
import { isLikeTags } from './isLikeTags.function'
import { isTagInstance } from './isInstance'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestTag: Tag, // existing tag already there
  newTemplater: TemplaterResult,
  tagSupport: BaseTagSupport,
  subject: TagSubject,
): {redraw: Tag, remit: boolean} {

  if(subject.tag) {
    newTemplater.global = subject.tag.tagSupport.templater.global
  }

  if(!oldestTag.hasLiveElements) {
    throw new Error('1080')
  }

  const preRenderCount = tagSupport.templater.global.renderCount
  providersChangeCheck(oldestTag)

  // When the providers were checked, a render to myself occurred and I do not need to re-render again
  const latestTag = tagSupport.templater.global.newest as Tag
  if(preRenderCount !== tagSupport.templater.global.renderCount) {
    oldestTag.updateByTag(latestTag)

    return {
      remit: true,
      redraw: latestTag,
    }
  }

  const oldTagSupport = oldestTag.tagSupport
  const hasChanged = hasTagSupportChanged(
    oldTagSupport,
    newTemplater.tagSupport,
    newTemplater,
  )

  const oldTemplater = tagSupport.templater || newTemplater

  const redraw = redrawTag(
    subject,
    newTemplater,
    oldestTag.ownerTag as Tag, // subject.tag.ownerTag as Tag
  )

  const oldest = tagSupport.templater.global.oldest || oldestTag
  redraw.tagSupport.templater.global.oldest = oldest

  if(redraw != redraw.tagSupport.templater.global.newest) {
    throw new Error('newest mismatched 22')
  }
  
  if(!redraw.tagSupport.templater.global.oldest) {
    throw new Error('8888888 - 0')
  }

  if(!oldTemplater.global.oldest) {
    throw new Error('8888888')
  }

  /* ??? - new removal
  if(newTemplater.global.oldest && !newTemplater.global.oldest.hasLiveElements) {
    throw new Error('7777')
  }
  */

  // ??? - add to ensure setProps causes lower redraw
  if(isLikeTags(latestTag, redraw)) {
    oldest.updateByTag(redraw)
  }

  if(!hasChanged) {
    // ??? - removed in favor of always update
    // oldest?.updateByTag(redraw)
    return {redraw, remit:true}
  }

  return {redraw, remit:false}
}
