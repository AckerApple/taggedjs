import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { ProcessInit } from "../tag/ProcessInit.type.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { ValueTypes } from "../tag/index.js"
import { processSubscribe } from "../tag/update/processSubscribe.function.js"
import { StatesSetter } from "../state/states.utils.js"
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js"
import { TagJsVar } from "./tagJsVar.type.js"

export type LikeSubscription = {
  unsubscribe: () => any
}

export type LikeObservable<T> = {
  subscribe: (callback: (arg: T) => any) => (LikeSubscription)
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
    delete: deleteAndUnsubscribe,

    checkValueChange: function subscribeDoNothing() {
      console.debug('weird to be here')
      return -1
    },

    Observable,
    callback,
    states: getSupportWithState( getSupportInCycle() as AnySupport).states,
  }
}

export type SubscribeValue = TagJsVar & {
  tagJsType: typeof ValueTypes.subscribe
  processInit: ProcessInit

  states: StatesSetter[]
  Observable: LikeObservable<any>
  withDefault?: any
  callback?: SubscribeCallback<any>
}
