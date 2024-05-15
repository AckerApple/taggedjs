import { TagSupport } from '../TagSupport.class'
import { isLikeTags } from '../isLikeTags.function'
import { destroyTagMemory } from '../destroyTag.function'
import { TagSubject, WasTagSubject } from '../../subject.types'
import { renderTagOnly } from './renderTagOnly.function'

export function renderWithSupport(
  tagSupport: TagSupport,
  lastSupport: TagSupport | undefined, // previous
  subject: TagSubject, // events & memory
  ownerSupport?: TagSupport, // who to report to
): TagSupport {
  const reSupport = renderTagOnly(
    tagSupport, lastSupport, subject, ownerSupport,
  )

  const isLikeTag = !lastSupport || isLikeTags(lastSupport, reSupport)
  if(!isLikeTag) {
    destroyUnlikeTags(
      lastSupport,
      reSupport,
      subject,
    )
  }

  const lastOwnerSupport = lastSupport?.ownerTagSupport
  reSupport.ownerTagSupport = (ownerSupport || lastOwnerSupport) as TagSupport

  return reSupport
}

function destroyUnlikeTags(
  lastSupport: TagSupport, // old
  reSupport: TagSupport, // new
  subject: TagSubject,
) {
  const oldGlobal = lastSupport.global
  const insertBefore = oldGlobal.insertBefore as Element
  
  destroyTagMemory(lastSupport)

  // when a tag is destroyed, disconnect the globals
  reSupport.global = {...oldGlobal} // break memory references
  const global = reSupport.global
  
  global.insertBefore = insertBefore
  global.deleted = false
  
  delete global.oldest
  delete global.newest
  delete (subject as WasTagSubject).tagSupport
}
