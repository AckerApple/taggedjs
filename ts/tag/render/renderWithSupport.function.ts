import { AnySupport, BaseSupport, Support, SupportContextItem } from '../Support.class.js'
import { moveProviders } from '../update/updateExistingTagComponent.function.js'
import { softDestroySupport } from './softDestroySupport.function.js'
import { SupportTagGlobal } from '../TemplaterResult.class.js'
import { renderTagOnly } from'./renderTagOnly.function.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { DomTag, StringTag } from '../Tag.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'

/** TODO: This seems to support both new and updates and should be separated? */
export function renderWithSupport(
  newSupport: Support | BaseSupport,
  lastSupport: Support | BaseSupport | undefined, // previous
  subject: SupportContextItem, // events & memory
  ownerSupport?: BaseSupport | Support, // who to report to
): {support: AnySupport, wasLikeTags: boolean} {
  const lastTemplater = lastSupport?.templater
  const lastTag = lastTemplater?.tag

  const reSupport = renderTagOnly(
    newSupport,
    lastSupport,
    subject,
    ownerSupport,
  )

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    moveProviders(lastSupport as Support, reSupport)
    softDestroySupport(lastSupport)
    const global = reSupport.subject.global as SupportTagGlobal
    global.oldest = reSupport
    global.newest = reSupport
  } else if(lastSupport) {
    const tag = lastSupport.templater.tag
    if(tag && subject.renderCount > 0) {
      checkTagSoftDestroy(tag, lastSupport, lastTag)
    }
  }

  const lastOwnerSupport = (lastSupport as Support)?.ownerSupport
  reSupport.ownerSupport = (ownerSupport || lastOwnerSupport) as Support

  return {support: reSupport, wasLikeTags: isLikeTag}
}

function checkTagSoftDestroy(
  tag: StringTag | DomTag,
  lastSupport: AnySupport,
  lastTag?: StringTag | DomTag,
) {
  if(tag.tagJsType===ValueTypes.dom) {
    const lastDom = (lastTag as DomTag)?.dom
    const newDom = (tag as DomTag).dom
    if(lastDom !== newDom) {
      softDestroySupport(lastSupport)
    }
    
    return
  }
  
  if(lastTag) {
    const lastStrings = (lastTag as StringTag).strings
    if(lastStrings) {
      const oldLength = lastStrings?.length
      const newLength = (tag as StringTag).strings.length
      if(oldLength !== newLength) {
        softDestroySupport(lastSupport)
      }
    }
  }
}
