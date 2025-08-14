import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { ContextStateMeta, ContextStateSupport } from "../tag/ContextStateMeta.type.js"
import { getSupportInCycle } from "../tag/cycles/getSupportInCycle.function.js"
import { ValueTypes } from "../tag/index.js"
import { StatesSetter } from "../state/states.utils.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { TagJsVar } from "./tagJsVar.type.js"
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { checkSubscribeValueChanged } from "./subscribeWith.function.js"
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js"
import { OnSubOutput, SubContext, SubscriptionContext } from "../tag/update/SubContext.type.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { checkStillSubscription } from "../tag/update/checkStillSubscription.function.js"

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
    
    let obValue = (observables[0] as any)?.value || value.withDefault

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
  const support = getSupportInCycle() as AnySupport

  let states: StatesSetter[] = []
  if (support) {
    const context = getSupportWithState(support).context
    const stateMeta = context.state as ContextStateMeta
    const newer = stateMeta.newer as ContextStateSupport
    states = newer.states
  }

  return {
    onOutput: blankHandler, // gets set within setupSubscribe()
    tagJsType: ValueTypes.subscribe,
    
    processInitAttribute: processSubscribeAttribute,
    processInit: setupSubscribe,
    checkValueChange: checkSubscribeValueChanged,
    
    processUpdate: checkStillSubscription,
    // processUpdate: processUpdateSubscribe,
    
    delete: deleteAndUnsubscribe,
    callback,
    states,
    
    Observables: [Observable],
  }
}

export type SubscribeValue = TagJsVar & {
  tagJsType: typeof ValueTypes.subscribe

  states: StatesSetter[]
  withDefault?: any
  callback?: SubscribeCallback<any>
  onOutput: OnSubOutput
  
  Observables: LikeObservable<any>[]
}
