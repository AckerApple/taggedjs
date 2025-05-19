import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { ProcessInit } from "../subject/ProcessInit.type.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { ValueTypes } from "../tag/index.js"
import { processSubscribe, processSubscribeWith } from "../tag/update/processSubscribe.function.js"
import { StatesSetter } from "./states.utils.js"

export type Subscription = {
  unsubscribe: () => any
}

export type LikeObservable<T> = {
  subscribe: (callback: (arg: T) => any) => (Subscription)
}

export type SubscribeCallback<T> = (data: T) => any

/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe<T>(
  Observable: LikeObservable<T>,
  callback?: SubscribeCallback<T>,
): SubscribeValue {
  return {
    tagJsType: ValueTypes.subscribe,
    processInit: processSubscribe,

    Observable,
    callback,
    states: getSupportWithState( getSupportInCycle() as AnySupport).states,
  }
}

export type SubscribeValue = {
  tagJsType: typeof ValueTypes.subscribe
  processInit: ProcessInit

  states: StatesSetter[]
  Observable: LikeObservable<any>
  withDefault?: any
  callback?: SubscribeCallback<any>
}
