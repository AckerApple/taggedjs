import { SubscribeValue } from '../../TagJsTags/subscribe.function.js'
import { setupSubscribe } from './setupSubscribe.function.js'
import { AnySupport } from '../index.js'
import { ContextItem } from '../ContextItem.type.js'
import { SubContext } from './SubContext.type.js'

export function processSubscribeWith(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  insertBefore?: Text,
  appendTo?: Element,
) {
  const subContext = setupSubscribe(
    value,
    contextItem,
    ownerSupport,
    insertBefore,
    appendTo,
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
  const observable = observables[0]
  

  if(!subContext.hasEmitted) {
    if('withDefault' in value) {
      subContext.subValueHandler(
        value.withDefault,
        0
      )
      return
    }

    if('value' in observable) {
      subContext.subValueHandler(
        (observable as any).value,
        0
      )
      return

    }

    return // nothing to emit
  }

  const emitValue = subContext.lastValues[0].value  
  subContext.subValueHandler(
    emitValue,
    0
  )
}
