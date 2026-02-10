import { SubscribeValue } from '../../TagJsTags/subscribe.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../index.js'
import { SubscriptionContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { handleTagTypeChangeFrom } from './handleTagTypeChangeFrom.function.js'

export function checkStillSubscription(
  newValue: TemplateValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subContext = contextItem.subContext as SubscriptionContext
  const hasChanged = handleTagTypeChangeFrom(
    ValueTypes.subscribe,
    newValue,
    ownerSupport,
    contextItem,// subContext as any as ContextItem, // contextItem,
  )

  if( hasChanged ) {
    return hasChanged
  }

  if (!subContext || !subContext.hasEmitted) {
    return 0
  }

  subContext.tagJsVar = newValue as SubscribeValue
  subContext.valuesHandler(
    subContext.lastValues,
    0,
  )

  return 0
}

