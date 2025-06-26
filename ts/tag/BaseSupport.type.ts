import { HtmlSupport } from './createHtmlSupport.function.js'
import { SupportContextItem } from './SupportContextItem.type.js'

export type BaseSupport = HtmlSupport & {
  context: SupportContextItem
}
