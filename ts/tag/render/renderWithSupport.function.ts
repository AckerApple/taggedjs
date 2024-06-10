import { BaseSupport, Support } from '../Support.class.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { TagSubject } from '../../subject.types.js'
import { renderTagOnly } from'./renderTagOnly.function.js'
import { destroyUnlikeTags } from'./destroyUnlikeTags.function.js'
import { softDestroySupport } from './softDestroySupport.function.js'

export function renderWithSupport(
  newSupport: Support | BaseSupport,
  lastSupport: Support | BaseSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: Support, // who to report to
): Support {
  const lastTemplater = lastSupport?.templater
  const lastStrings = lastTemplater?.tag?.strings

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
    const oldLength = lastStrings?.length
    const newLength = reSupport.templater.tag?.strings.length
    if(oldLength !== newLength) {
      softDestroySupport(lastSupport)
    }
  }


  const lastOwnerSupport = (lastSupport as Support)?.ownerSupport
  reSupport.ownerSupport = (ownerSupport || lastOwnerSupport) as Support

  return reSupport
}
