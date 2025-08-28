import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { ContextStateMeta, ContextStateSupport } from "../tag/ContextStateMeta.type.js"
import { getSupportInCycle } from "../tag/cycles/getSupportInCycle.function.js"
import { getContextInCycle } from "../tag/cycles/setContextInCycle.function.js"
import { ContextItem, ValueTypes } from "../tag/index.js"
import { processSubscribeWith } from "../tag/update/processSubscribeWith.function.js"
import { deleteAndUnsubscribe } from "../tag/update/setupSubscribe.function.js"
import { LikeObservable, processSubscribeWithAttribute, SubscribeCallback, SubscribeValue } from "./subscribe.function.js"

/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function subscribeWith<SubValue, DEFAULT>(
  Observable: LikeObservable<SubValue>,
  withDefault: DEFAULT,
  callback?: SubscribeCallback<SubValue | DEFAULT>,
): SubscribeValue {
  // const support = getSupportInCycle() as AnySupport
  // const context = getSupportWithState(support).context
  
  /*
  const context = getContextInCycle() as ContextItem
  const stateMeta = context.state as ContextStateMeta
  const newer = stateMeta.newer as ContextStateSupport
  */
  
  return {
    onOutput: blankHandler, // this gets set within setupSubscribe
    tagJsType: ValueTypes.subscribe,
    processInitAttribute: processSubscribeWithAttribute,
    processInit: processSubscribeWith,
    checkValueChange: checkSubscribeValueChanged,
    
    // processUpdate: tagValueUpdateHandler,
    processUpdate: blankHandler,

    destroy: deleteAndUnsubscribe,

    callback,
    withDefault,
    // states: newer.states,
    
    Observables: [Observable],
  }
}

/** checks is a previous tag var was a subscription but now has changed */
export function checkSubscribeValueChanged(
  value: unknown | SubscribeValue,
  contextItem: ContextItem,
): number  {
  if(!(value as SubscribeValue)?.tagJsType) {
    return 1 // its not a subscription anymore
  }
  
  const newObserves = (value as SubscribeValue).Observables
  if(!newObserves) {
    return 2 // its not a subscription anymore
  }

  const oldValue = contextItem.value as SubscribeValue
  const oldObserves = oldValue.Observables
  if(!oldObserves || oldObserves.length !== newObserves.length) {
    return 3 // not the same subscription
  }

  const allMatch = newObserves.every((ob, index) => ob === oldObserves[index])
  if( !allMatch ) {
    return 4
  }


  return 0 // still the same
}
