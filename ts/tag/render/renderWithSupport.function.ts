import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { isLikeTags } from'../isLikeTags.function.js'
import { destroyTagMemory } from'../destroyTag.function.js'
import { TagSubject, WasTagSubject } from '../../subject.types.js'
import { renderTagOnly } from'./renderTagOnly.function.js'

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

function destroyUnlikeTags(
  lastSupport: TagSupport | BaseTagSupport, // old
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
  
  global.oldest = reSupport
  global.newest = reSupport
  ;(subject as WasTagSubject).tagSupport = reSupport
}
