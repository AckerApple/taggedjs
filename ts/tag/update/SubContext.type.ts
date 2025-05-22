import { AdvancedContextItem, TemplateValue } from "../../index.js"
import { SubscribeCallback } from "../../tagJsVars/subscribe.function.js"
import { LikeSubscription } from '../../tagJsVars/subscribe.function.js'

export interface SubContext {
  hasEmitted?: true
  deleted?: true
  
  /** Handles emissions from subject and figures out what to display */
  valueHandler: (
    value: TemplateValue
  ) => void
  lastValue: any
  
  appendMarker?: Text  
  contextItem?: AdvancedContextItem
}

export interface SubscriptionContext extends SubContext {
  callback?: SubscribeCallback<any>
  subscription: LikeSubscription
}