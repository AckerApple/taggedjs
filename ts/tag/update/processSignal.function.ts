import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { SignalObject } from '../../state/signal.function.js'
import { AnySupport } from '../index.js'
import { ContextItem } from '../ContextItem.type.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function processSignal(
  value: SignalObject<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  _insertBefore?: Text,
  appendTo?: Element,
) {
  const subValue: SubscribeValue = {
    tagJsType: ValueTypes.subscribe,
    states: [],
    Observables: [value],
  } as any as SubscribeValue

  setupSubscribe(
    subValue,
    contextItem,
    ownerSupport,
    _insertBefore,
    appendTo,
  )
}
