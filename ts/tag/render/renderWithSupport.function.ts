import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { TagSubject } from '../../subject.types.js'
import { renderTagOnly } from'./renderTagOnly.function.js'
import { destroyUnlikeTags } from'./destroyUnlikeTags.function.js'
import { softDestroySupport } from './softDestroySupport.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { Dom, Tag } from '../Tag.class.js'
import { deepEqual } from '../../deepFunctions.js'

export function renderWithSupport(
  newSupport: Support | BaseSupport,
  lastSupport: Support | BaseSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: BaseSupport | Support, // who to report to
): Support {
  const lastTemplater = lastSupport?.templater
  const lastTag = lastTemplater?.tag

  const reSupport = renderTagOnly(
    newSupport, lastSupport, subject, ownerSupport,
  )

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
  } else if(lastSupport) {
    const tag = reSupport.templater.tag

    if(tag) {
      checkTagSoftDestroy(tag, lastSupport, lastTag)
    }
  }


  const lastOwnerSupport = (lastSupport as Support)?.ownerSupport
  reSupport.ownerSupport = (ownerSupport || lastOwnerSupport) as Support

  return reSupport
}

function checkTagSoftDestroy(
  tag: Tag | Dom,
  lastSupport: AnySupport,
  lastTag?: Tag | Dom,
) {
  if(tag.tagJsType===ValueTypes.dom) {
    const lastDom = (lastTag as Dom)?.dom
    const newDom = (tag as Dom).dom
    if(!deepEqual(lastDom, newDom)) {
      softDestroySupport(lastSupport)
    }
    
    return
  }
  
  if(lastTag) {
    if(lastTag.tagJsType === ValueTypes.dom) {
      throw new Error('check here')
    }

    const lastStrings = (lastTag as Tag).strings
    if(lastStrings) {
      const oldLength = lastStrings?.length
      const newLength = (tag as Tag).strings.length
      if(oldLength !== newLength) {
        softDestroySupport(lastSupport)
      }
    }
  }
}
