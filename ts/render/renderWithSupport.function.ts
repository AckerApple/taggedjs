import { AnySupport } from '../tag/index.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { moveProviders } from './update/updateExistingTagComponent.function.js'
import { softDestroySupport } from './softDestroySupport.function.js'
import { firstTagRender, getSupportOlderState, reRenderTag } from'./renderTagOnly.function.js'
import { isLikeTags } from'../tag/isLikeTags.function.js'
import { StringTag } from '../tag/StringTag.type.js'
import { DomTag } from '../tag/DomTag.type.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { Tag } from '../tag/Tag.type.js'

/** TODO: This seems to support both new and updates and should be separated? */
export function renderWithSupport(
  newSupport: AnySupport,
  lastSupport: AnySupport| undefined, // previous (global.newest)
  subject: SupportContextItem, // events & memory
): {support: AnySupport, wasLikeTags: boolean} {
  let reSupport: AnySupport

  delete subject.toRender

  if( getSupportOlderState(lastSupport) ) {
    reSupport = reRenderTag(
      newSupport,
      lastSupport,
      subject,
    )
  } else {
    reSupport = firstTagRender(
      newSupport,
      lastSupport,
      subject,
    )
  }

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    moveProviders(lastSupport as AnySupport, reSupport)
    softDestroySupport(lastSupport)
    const subject = reSupport.context

    subject.state.oldest = reSupport
    subject.state.newest = reSupport
    subject.state.older = subject.state.newer
  } else if(lastSupport) {
    const tag = lastSupport.templater.tag
    if(tag && subject.renderCount > 0) {
      const lastTemplater = lastSupport?.templater
      const lastTag = lastTemplater?.tag

      checkTagSoftDestroy(tag, lastSupport, lastTag)
    }
  }

  reSupport.ownerSupport = newSupport.ownerSupport// || lastOwnerSupport) as AnySupport
  return {
    support: reSupport,
    wasLikeTags: isLikeTag
  }
}

function checkTagSoftDestroy(
  tag: Tag,
  lastSupport: AnySupport,
  lastTag?: Tag,
) {
  if(tag.tagJsType === ValueTypes.dom) {
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
