import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { ValueTypes } from "../tag/index.js"
import { processSubscribeWith } from "../tag/update/processSubscribe.function.js"
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js"
import { LikeObservable, SubscribeCallback, SubscribeValue } from "./subscribe.function.js"

/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function subscribeWith<SubValue, DEFAULT>(
  Observable: LikeObservable<SubValue>,
  withDefault: DEFAULT,
  callback?: SubscribeCallback<SubValue | DEFAULT>,
): SubscribeValue {
  return {
    tagJsType: ValueTypes.subscribe,
    processInit: processSubscribeWith,
    delete: deleteAndUnsubscribe,

    callback,
    withDefault,
    states: getSupportWithState( getSupportInCycle() as AnySupport).states,
    
    Observables: [Observable],
  }
}
