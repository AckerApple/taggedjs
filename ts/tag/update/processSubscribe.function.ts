import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../getSupport.function.js'
import { ContextItem } from '../Context.types.js'
import { SubscribeValue } from '../../state/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { SignalObject } from '../../subject/signal.function.js'

export function processSubscribe(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
) {
  return setupSubscribe(
    value.Observable,
    contextItem,
    ownerSupport,
    counts,
    value.callback,
    appendTo,
  )
}

export function processSignal(
  value: SignalObject,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: Counts, // {added:0, removed:0}
  appendTo?: Element,
) {
  setupSubscribe(
    value,
    contextItem,
    ownerSupport,
    counts,
    undefined,
    appendTo,
  )
}
