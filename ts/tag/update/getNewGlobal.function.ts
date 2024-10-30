import {SupportContextItem } from '../Support.class.js'
import { TagGlobal } from '../TemplaterResult.class.js'
import { ContextItem } from '../Context.types.js'

export function getNewGlobal(subject: ContextItem): TagGlobal {
  ;(subject as SupportContextItem).renderCount = 0
  return subject.global = {} // TODO: makeSupportTagGlobal
}
