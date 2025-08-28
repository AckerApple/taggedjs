import { SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../index.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'
import { SubscriptionContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

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

/** used to handle when value was subscribe but now is something else */
export function handleTagTypeChangeFrom(
  originalType: string,
  newValue: TemplateValue,
  ownerSupport: AnySupport,
  contextItem: ContextItem, // NOT the subContext
) {
  const isDifferent = !newValue || !(newValue as any).tagJsType || (newValue as any).tagJsType !== originalType

  if(isDifferent) {
    const oldTagJsVar = contextItem.tagJsVar as TagJsVar
    oldTagJsVar.destroy(contextItem, ownerSupport)

    updateToDiffValue(
      newValue as TemplateValue,
      contextItem, // subSubContext,
      ownerSupport,
      99,
    )
    return 99
  }
}
