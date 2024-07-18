import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { renderTagOnly } from'./renderTagOnly.function.js'
import { destroyUnlikeTags } from'./destroyUnlikeTags.function.js'
import { softDestroySupport } from './softDestroySupport.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { ContextItem, DomTag, StringTag } from '../Tag.class.js'
import { deepEqual } from '../../deepFunctions.js'

/** TODO: This seems to support both new and updates and should be separated? */
export function renderWithSupport(
  newSupport: Support | BaseSupport,
  lastSupport: Support | BaseSupport | undefined, // previous
  subject: ContextItem, // events & memory
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
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
  } else if(lastSupport) {
    // const tag = reSupport.templater.tag
    const tag = lastSupport.templater.tag
    if(tag && subject.global.renderCount > 1) {
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
      delete lastSupport.subject.global.deleted
    }
    
    return
  }
  
  // TODO: This is classic runtime code, need to test it
  if(lastTag) {
    const lastStrings = (lastTag as StringTag).strings
    if(lastStrings) {
      const oldLength = lastStrings?.length
      const newLength = (tag as StringTag).strings.length
      if(oldLength !== newLength) {
        softDestroySupport(lastSupport)
        delete lastSupport.subject.global.deleted
      }
    }
  }
}
