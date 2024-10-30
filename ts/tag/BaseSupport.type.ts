import { State } from '../state/index.js'
import { StatesSetter } from '../state/states.utils.js'
import { HtmlSupport, SupportContextItem } from './Support.class.js'

export type BaseSupport = HtmlSupport & {
  state: State // TODO: this is not needed for every type of  tag
  states: StatesSetter[] // TODO: this is not needed for every type of tag
  
  subject: SupportContextItem
}
