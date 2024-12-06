import { HtmlSupport, SupportContextItem } from './Support.class.js'

export type BaseSupport = HtmlSupport & {
  subject: SupportContextItem
}
