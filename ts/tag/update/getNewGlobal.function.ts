import { AppSupportContextItem, SupportContextItem } from '../SupportContextItem.type.js'
import { SupportTagGlobal, TagGlobal } from '../getTemplaterResult.function.js'
import { ContextItem } from '../ContextItem.type.js'

export function getNewGlobal(
  contextItem: SupportContextItem | AppSupportContextItem
): TagGlobal {
  contextItem.renderCount = contextItem.renderCount || 0
  return contextItem.global = {} as SupportTagGlobal
}
