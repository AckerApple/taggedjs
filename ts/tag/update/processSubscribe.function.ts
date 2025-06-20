import type { TagCounts } from '../../tag/TagCounts.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { SignalObject } from '../../state/signal.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'

export function processSubscribe(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  return setupSubscribe(
    value.Observables,
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
  counts: TagCounts,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const observables = value.Observables
  const subscription = setupSubscribe(
    observables,
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    value.callback,
    appendTo,
    insertBefore,
  )

  if(!subscription.hasEmitted) {
    const obValue = (observables[0] as any)?.value
    subscription.valueHandler(
      (obValue || value.withDefault) as TemplateValue,
      0
    )
  }

  return subscription
}

export function processSignal(
  value: SignalObject<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  appendTo?: Element,
) {
  setupSubscribe(
    [value],
    contextItem as AdvancedContextItem,
    ownerSupport,
    counts,
    undefined,
    appendTo,
  )
}
