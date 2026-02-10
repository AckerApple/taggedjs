import { ValueTypes } from "../tag/index.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { TagJsTag } from "./TagJsTag.type.js"
import { checkSubscribeValueChanged } from "./subscribeWith.function.js"
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js"
import { OnSubOutput } from "../tag/update/SubContext.type.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { checkStillSubscription } from "../tag/update/checkStillSubscription.function.js"
import { Subject } from "../index.js"
import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js"

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

export type SubscribeValue = TagJsTag & {
  tagJsType: typeof ValueTypes.subscribe

  // states: StatesSetter[]
  withDefault?: any
  callback?: SubscribeCallback<any>
  onOutput: OnSubOutput
  
  Observables: LikeObservable<any>[]
}

function subscribeAll<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F], callback?: SubscribeCallback<[A,B,C,D,E,F]>): SubscribeValue
function subscribeAll<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E], callback?: SubscribeCallback<[A,B,C,D,E]>): SubscribeValue
function subscribeAll<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D], callback?: SubscribeCallback<[A,B,C,D]>): SubscribeValue
function subscribeAll<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C], callback?: SubscribeCallback<[A,B,C]>): SubscribeValue
function subscribeAll<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B], callback?: SubscribeCallback<[A,B]>): SubscribeValue
function subscribeAll<A>(args: [LikeObservable<A> | A], callback?: SubscribeCallback<[A]>): SubscribeValue
function subscribeAll<T>(
  subjects: LikeObservable<T>[],
  callback?: SubscribeCallback<T>,
) {
  return subscribe(
    Subject.all(subjects as any) as any, callback
  )
}
