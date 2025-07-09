import { getSupportWithState } from "../interpolations/attributes/getSupportWithState.function.js"
import { blankHandler } from "../render/dom/attachDomElements.function.js"
import { AnySupport } from "../tag/AnySupport.type.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { AdvancedContextItem, ContextItem, TagCounts, ValueTypes } from "../tag/index.js"
import { deleteAndUnsubscribe, setupSubscribe } from "../tag/update/setupSubscribe.function.js"
import { LikeObservable, SubscribeCallback, SubscribeValue } from "./subscribe.function.js"

/** Have an html tagged value as value of subscribe emissions, with initial default value emission. Automatically unsubscribes for you */
export function pipe<SubValue, DEFAULT>(
  Observables: LikeObservable<SubValue>[],
  callback?: SubscribeCallback<SubValue | DEFAULT>,
): SubscribeValue {
  return {
    tagJsType: ValueTypes.subscribe,
    processInit: processPipe,
    // processUpdate: tagValueUpdateHandler,
    processUpdate: blankHandler,
    delete: deleteAndUnsubscribe,

    callback,
    states: getSupportWithState( getSupportInCycle() as AnySupport).states,
    
    Observables,
  }
}

function processPipe(
  values: LikeObservable<any>[],
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element,
) {
  return setupSubscribe(
    values,
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    undefined,
    appendTo,
  )
}