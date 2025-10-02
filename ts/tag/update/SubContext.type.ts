import { ContextItem, TemplateValue } from "../../index.js"
import { LikeSubscription } from "../../tagJsVars/processSubscribeWithAttribute.function.js"
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { TagJsVar } from "../../tagJsVars/tagJsVar.type.js"

export interface SubContext {
  tagJsVar?: TagJsVar // may not be available at start
  hasEmitted?: true
  deleted?: true
  
  /** Handles each emission separately */
  subValueHandler: (
    value: TemplateValue,
    index: number,
  ) => void

  /** Handles all emissions collectively */
  valuesHandler: (
    values: {value: TemplateValue, tagJsVar: TagJsVar}[],
    index: number,
  ) => void
  
  lastValues: {
    value: TemplateValue,
    tagJsVar: TagJsVar,
    oldTagJsVar?: TagJsVar,
  }[]
  
  appendMarker?: Text  
  contextItem?: ContextItem
}

export type OnSubOutput = (
  value: TemplateValue,
  syncRun: boolean,
  subContext: SubscriptionContext,
) => any

export interface SubscriptionContext extends SubContext {
  tagJsVar: SubscribeValue // may not be available at start
  subscriptions: LikeSubscription[]
}