import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { SignalObject } from '../../state/signal.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { SubContext } from './SubContext.type.js'

export function processSubscribeWith(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  appendTo?: Element,
  insertBefore?: Text,
) {
  const subContext = setupSubscribe(
    value,
    contextItem as AdvancedContextItem,
    ownerSupport,
    appendTo,
    insertBefore,
  )

  if(!subContext.hasEmitted) {
    emitSubContext(value, subContext)
  }

  return subContext
}

export function emitSubContext(
  value: SubscribeValue,
  subContext: SubContext,
) {
  const observables = value.Observables
  const obValue = (observables[0] as any)?.value
  subContext.subValueHandler(
    (obValue || value.withDefault) as TemplateValue,
    0
  )
}

export function processSignal(
  value: SignalObject<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  appendTo?: Element,
) {
  const subValue: SubscribeValue = {
    tagJsType: ValueTypes.subscribe,
    states: [],
    Observables: [value],
  } as any as SubscribeValue

  setupSubscribe(
    subValue,
    contextItem as AdvancedContextItem,
    ownerSupport,
    appendTo,
  )
}
