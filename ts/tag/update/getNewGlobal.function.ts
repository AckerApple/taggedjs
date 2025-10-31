import { SupportContextItem } from '../SupportContextItem.type.js'
import { SupportTagGlobal } from '../getTemplaterResult.function.js'

/** Only used in TagSupport */
export function getNewGlobal(
  contextItem: SupportContextItem
): SupportTagGlobal {
  // TODO: Not need for basic supports, only tag()
  contextItem.renderCount = contextItem.renderCount || 0
  contextItem.varCounter = 0

  // TODO: Not need for basic supports, only tag()
  contextItem.state = {
    newer: {
      state: [],
      states: [],
    },
  }

  return contextItem.global = {
    blocked: [],
  }
}
