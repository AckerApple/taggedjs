import { Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { hasTagSupportChanged } from './hasTagSupportChanged.function'
import { providersChangeCheck } from './provider.utils'
import { TemplaterResult } from './TemplaterResult.class'
import { TagSubject, redrawTag } from './Tag.utils'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestTag: Tag, // existing tag already there
  newTemplater: TemplaterResult,
  tagSupport: BaseTagSupport,
  subject: TagSubject,
  ownerTag: Tag,
): {redraw: Tag, remit: boolean} {

  if(subject.tag) {
    console.log('already the same?', newTemplater.global === subject.tag?.tagSupport.templater.global)
    newTemplater.global = subject.tag.tagSupport.templater.global
  }

  if(!oldestTag.hasLiveElements) {
    throw new Error('1080')
  }

  const preRenderCount = tagSupport.templater.global.renderCount
  providersChangeCheck(oldestTag)

  // When the providers were checked, a render to myself occurred and I do not need to re-render again
  if(preRenderCount !== tagSupport.templater.global.renderCount) {
    const redraw = tagSupport.templater.global.newest as Tag
    oldestTag.updateByTag(redraw)

    return {
      remit: true,
      redraw
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

  const oldest = tagSupport.templater.global.oldest
  /*
  newTemplater.global.newest = redraw
  redraw.tagSupport.templater.global.newest = redraw
  redraw.tagSupport.templater.global.oldest = oldest
  tagSupport.templater.global.newest = redraw
  newTemplater.global.newest = redraw
  */
  
  if(!redraw.tagSupport.templater.global.oldest) {
    throw new Error('8888888 - 0')
  }

  if(!oldTemplater.global.oldest) {
    throw new Error('8888888')
  }


  if(newTemplater.global.oldest && !newTemplater.global.oldest.hasLiveElements) {
    throw new Error('7777')
  }


  if(!hasChanged) {
    oldest?.updateByTag(redraw)
    return {redraw, remit:true}
  }

  return {redraw, remit:false}
}
