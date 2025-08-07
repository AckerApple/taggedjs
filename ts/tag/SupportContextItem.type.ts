import { ContextItem } from '../index.js'
import { AppContextItem } from './ContextItem.type.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'

export interface AppSupportContextItem extends AppContextItem {
  global: SupportTagGlobal
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
}

export interface SupportContextItem extends ContextItem {
  contexts: SupportContextItem[] // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  global: SupportTagGlobal
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
}
