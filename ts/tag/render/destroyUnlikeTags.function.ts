import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { destroyTagMemory } from'../destroyTag.function.js'
import { TagSubject, WasTagSubject } from '../../subject.types.js'
import { moveProviders } from '../update/updateExistingTagComponent.function.js'

export function destroyUnlikeTags(
  lastSupport: TagSupport | BaseTagSupport, // old
  reSupport: TagSupport, // new
  subject: TagSubject,
) {
  const oldGlobal = lastSupport.global
  const insertBefore = oldGlobal.insertBefore as Element

  // when a tag is destroyed, disconnect the globals
  const global = reSupport.global = {...oldGlobal} // break memory references

  moveProviders(lastSupport as TagSupport, reSupport)
  destroyTagMemory(lastSupport)
  global.insertBefore = insertBefore
  delete global.deleted
  
  global.oldest = reSupport
  global.newest = reSupport
  ;(subject as WasTagSubject).tagSupport = reSupport

  const placeParent = reSupport.global.placeholder?.parentNode
  const insertParent = insertBefore.parentNode as ParentNode
  if(placeParent && insertParent) {
     insertParent.removeChild(insertBefore)
  }
}
