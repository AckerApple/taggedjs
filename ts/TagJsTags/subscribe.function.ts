import { ValueTypes } from "../tag/index.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { TagJsTag } from "./TagJsTag.type.js"
import { checkSubscribeValueChanged } from "./subscribeWith.function.js"
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js"
import { OnSubOutput } from "../tag/update/SubContext.type.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { checkStillSubscription } from "../tag/update/checkStillSubscription.function.js"
import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js"
import { subscribeAll } from "./subscribeAll.function.js"

/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe<T>(
  Observable: LikeObservable<T>,
  callback?: SubscribeCallback<T>,
): SubscribeValue {
  return {
    component: false,
    onOutput: blankHandler, // gets set within setupSubscribe()
    tagJsType: ValueTypes.subscribe,
    
    processInitAttribute: processSubscribeAttribute,
    processInit: setupSubscribe,
    hasValueChanged: checkSubscribeValueChanged,
    
    processUpdate: checkStillSubscription,
    // processUpdate: processUpdateSubscribe,
    
    destroy: deleteAndUnsubscribe,
    callback,
    // states,
    
    Observables: [Observable],
  }
}

subscribe.all = subscribeAll

export type SubscribeValue = TagJsTag<any> & {
  tagJsType: typeof ValueTypes.subscribe

  // states: StatesSetter[]
  withDefault?: any
  callback?: SubscribeCallback<any>
  onOutput: OnSubOutput
  
  Observables: LikeObservable<any>[]
}


