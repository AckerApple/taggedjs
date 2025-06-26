import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../AnySupport.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'
import { SubscriptionContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { TagCounts } from '../TagCounts.type.js'

export function checkSubContext(
  newValue: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
  values: any[],
  counts: TagCounts,
) {
  const hasChanged = handleTagTypeChangeFrom(
    ValueTypes.subscribe,
    newValue,
    ownerSupport,
    contextItem,
    counts,
  )
  if( hasChanged ) {
    return hasChanged
  }

  const subscription = contextItem.subContext as SubscriptionContext
  if (!subscription.hasEmitted) {
    return -1
  }

  subscription.callback = (newValue as SubscribeValue).callback
  subscription.valuesHandler( subscription.lastValues )

  return -1
}

export function handleTagTypeChangeFrom(
  originalType: string,
  newValue: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
  counts: TagCounts,
) {
  if(!newValue || !(newValue as any).tagJsType || (newValue as any).tagJsType !== originalType) {
    const tagJsVar = contextItem.tagJsVar as TagJsVar
    tagJsVar.delete(contextItem, ownerSupport)

    updateToDiffValue(
      newValue as TemplateValue,
      contextItem,
      ownerSupport,
      99,
      counts,
    )
    return 99
  }
}
