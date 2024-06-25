import { AnySupport, Support } from '../Support.class.js'
import { softDestroySupport } from './softDestroySupport.function.js'
import { TagSubject } from '../../subject.types.js'
import { moveProviders } from '../update/updateExistingTagComponent.function.js'

export function destroyUnlikeTags(
  lastSupport: AnySupport, // old
  reSupport: AnySupport, // new
  subject: TagSubject,
) {
  // when a tag is destroyed, disconnect the globals
  const global = reSupport.subject.global // = {...oldGlobal} // break memory references

  moveProviders(lastSupport as Support, reSupport)
  softDestroySupport(lastSupport)  
  delete global.deleted
  
  global.oldest = reSupport
  global.newest = reSupport
  ;(subject as any).support = reSupport
}
