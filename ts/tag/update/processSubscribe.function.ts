import type { TagCounts } from '../../tag/TagCounts.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { SignalObject } from '../../subject/signal.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { ValueSubject } from '../../subject/ValueSubject.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'

export function processSubscribe(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
) {
  return setupSubscribe(
    value.Observable,
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    value.callback,
    appendTo,
    insertBefore,
  )
}

export function processSubscribeWith(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,
  insertBefore?: Text,
) {
  const observable = value.Observable as ValueSubject<any>
  const subscription = setupSubscribe(
    observable,
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    value.callback,
    appendTo,
    insertBefore,
  )

  if(!subscription.hasEmitted) {
    subscription.valueHandler((observable.value || value.withDefault) as TemplateValue)
  }

  return subscription
}

export function processSignal(
  value: SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts, // {added:0, removed:0}
  appendTo?: Element,
) {
  setupSubscribe(
    value,
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    undefined,
    appendTo,
  )
}
