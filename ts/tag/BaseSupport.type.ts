import { HtmlSupport, SupportContextItem } from './getSupport.function.js'

export type BaseSupport = HtmlSupport & {
  subject: SupportContextItem
}
