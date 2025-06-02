import { SupportContextItem } from '../SupportContextItem.type.js'
import { TagGlobal } from '../getTemplaterResult.function.js'
import { ContextItem } from '../ContextItem.type.js'

export function getNewGlobal(contextItem: ContextItem): TagGlobal {
  ;(contextItem as SupportContextItem).renderCount = (contextItem as SupportContextItem).renderCount || 0
  return contextItem.global = {}
}
