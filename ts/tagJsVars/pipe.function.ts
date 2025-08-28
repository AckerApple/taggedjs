import { blankHandler } from "../render/dom/blankHandler.function.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { ContextItem, ValueTypes } from "../tag/index.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { LikeObservable, SubscribeCallback, SubscribeValue } from "./subscribe.function.js"
import { checkSubscribeValueChanged } from "./subscribeWith.function.js"

/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function pipe<SubValue, DEFAULT>(
  Observables: LikeObservable<SubValue>[],
  callback?: SubscribeCallback<SubValue | DEFAULT>,
): SubscribeValue {
  /*
  const support = getSupportInCycle() as AnySupport
  const context = getSupportWithState(support).context
  const stateMeta = context.state as ContextStateMeta
  const newer = stateMeta.newer as ContextStateSupport
  */
  return {
    onOutput: blankHandler, // gets set within setupSubscribe()
    tagJsType: ValueTypes.subscribe,
    
    processInitAttribute: blankHandler,
    checkValueChange: checkSubscribeValueChanged,
    processInit: processPipe,
    
    
    processUpdate: blankHandler,
    destroy: deleteAndUnsubscribe,

    callback,
    // states: newer.states,
    
    Observables,
  }
}

function processPipe(
  values: LikeObservable<any>[],
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  _insertBefore?: Text,
  appendTo?: Element,
) {
  const subValue: SubscribeValue = {
    tagJsType: ValueTypes.subscribe,
    states: [],
    Observables: values,
  } as any as SubscribeValue

  return setupSubscribe(
    subValue,
    contextItem,
    ownerSupport,
    undefined,
    appendTo,
  )
}