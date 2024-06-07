import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { TagSubject } from '../../subject.types.js'
import { renderTagOnly } from'./renderTagOnly.function.js'
import { destroyUnlikeTags } from'./destroyUnlikeTags.function.js'

export function renderWithSupport(
  newTagSupport: TagSupport | BaseTagSupport,
  lastSupport: TagSupport | BaseTagSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: TagSupport, // who to report to
): TagSupport {
  const reSupport = renderTagOnly(
    newTagSupport, lastSupport, subject, ownerSupport,
  )

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
    reSupport.global.oldest = reSupport
  }

  const lastOwnerSupport = (lastSupport as TagSupport)?.ownerTagSupport
  reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport) as TagSupport

  return reSupport
}
