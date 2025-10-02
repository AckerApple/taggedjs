import { AnySupport } from "../tag/AnySupport.type.js"
import { TagJsVar } from "./tagJsVar.type.js"
import { AttributeContextItem } from "../tag/AttributeContextItem.type.js"
import { processSubscribeAttribute } from "./processSubscribeAttribute.function.js"
import {  SubContext, SubscriptionContext } from "../tag/update/SubContext.type.js"
import { blankHandler } from "../render/dom/blankHandler.function.js"
import { SubscribeValue } from "./index.js"


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
    const observables = value.Observables
    let obValue = (observables[0] as any)?.value || value.withDefault
    // subContext.hasEmitted = true
    // subContext.lastValues[0] = obValue

    if( value.callback ) {
      obValue = value.callback(obValue)
    }

    onOutput(obValue, true, subContext as SubscriptionContext)
}