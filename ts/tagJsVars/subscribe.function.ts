import { AnySupport } from "../tag/AnySupport.type.js"
import { ContextStateMeta, ContextStateSupport } from "../tag/ContextStateMeta.type.js"
import { ContextItem, ValueTypes } from "../tag/index.js"
import { StatesSetter } from "../state/states.utils.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { TagJsVar } from "./tagJsVar.type.js"
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { checkSubscribeValueChanged } from "./subscribeWith.function.js"
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js"
import { OnSubOutput, SubContext, SubscriptionContext } from "../tag/update/SubContext.type.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { checkStillSubscription } from "../tag/update/checkStillSubscription.function.js"
import { Subject } from "../index.js"

export type LikeSubscription = {
  unsubscribe: () => any
}

export type Subscriber<T> = (arg: T) => any
export type SubscribeFn<T> = (callback: Subscriber<T>) => (LikeSubscription)

export type LikeObservable<T> = {
  subscribe: SubscribeFn<T>
}

export type SubscribeCallback<T> = (data: T) => any

export function processSubscribeWithAttribute(
  name: string,
  value: SubscribeValue, // TemplateValue | StringTag | SubscribeValue | SignalObject,
  element: HTMLElement,
  _tagJsVar: TagJsVar, // its the same as the value
  contextItem: AttributeContextItem,
  ownerSupport: AnySupport,
) {
  const { subContext } = processSubscribeAttribute(
    name,
    value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
    element,
    value,
    contextItem,
    ownerSupport,
  )

  if( !subContext.hasEmitted ) {
    emitSubScriptionAsIs(value, subContext)
  }
}

export function emitSubScriptionAsIs(
  value: SubscribeValue,
  subContext: SubContext,
) {
    const tagJsVar = subContext.tagJsVar as SubscribeValue
    const onOutput = tagJsVar.onOutput // value.onOutput
    // TODO: remove
    if(onOutput === blankHandler) {
      throw new Error('blankhandler not converted')
    }
    const observables = value.Observables
    //const hasEmitted = subContext.hasEmitted
    // const hasValue = 'value' in observables[0]
    // let obValue = hasValue ? (observables[0] as any)?.value : value.withDefault
    // let obValue = hasEmitted ? (observables[0] as any)?.value : value.withDefault
    let obValue = (observables[0] as any)?.value || value.withDefault
    // subContext.hasEmitted = true
    // subContext.lastValues[0] = obValue

    if( value.callback ) {
      obValue = value.callback(obValue)
    }

    onOutput(obValue, true, subContext as SubscriptionContext)
}

/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export function subscribe<T>(
  Observable: LikeObservable<T>,
  callback?: SubscribeCallback<T>,
): SubscribeValue {
  return {
    onOutput: blankHandler, // gets set within setupSubscribe()
    tagJsType: ValueTypes.subscribe,
    
    processInitAttribute: processSubscribeAttribute,
    processInit: setupSubscribe,
    checkValueChange: checkSubscribeValueChanged,
    
    processUpdate: checkStillSubscription,
    // processUpdate: processUpdateSubscribe,
    
    destroy: deleteAndUnsubscribe,
    callback,
    // states,
    
    Observables: [Observable],
  }
}

subscribe.all = subscribeAll

export type SubscribeValue = TagJsVar & {
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
