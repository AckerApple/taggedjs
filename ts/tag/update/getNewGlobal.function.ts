import { SupportContextItem } from '../SupportContextItem.type.js'
import { TagGlobal } from '../getTemplaterResult.function.js'
import { ContextItem } from '../ContextItem.type.js'

export function getNewGlobal(subject: ContextItem): TagGlobal {
  ;(subject as SupportContextItem).renderCount = (subject as SupportContextItem).renderCount || 0
  // ;(subject as SupportContextItem).renderCount = 0
  return subject.global = {}
}
