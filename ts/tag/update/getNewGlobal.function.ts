import { SupportContextItem } from '../getSupport.function.js'
import { TagGlobal } from '../getTemplaterResult.function.js'
import { ContextItem } from '../Context.types.js'

export function getNewGlobal(subject: ContextItem): TagGlobal {
  ;(subject as SupportContextItem).renderCount = (subject as SupportContextItem).renderCount || 0
  // ;(subject as SupportContextItem).renderCount = 0
  return subject.global = {}
}
