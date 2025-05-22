import { AdvancedContextItem } from './AdvancedContextItem.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'

export interface SupportContextItem extends AdvancedContextItem {
  global: SupportTagGlobal
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
}
