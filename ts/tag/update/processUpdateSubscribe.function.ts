import { ContextItem, AnySupport, TemplateValue, SubscribeValue, SubContext } from '../../index.js';
import { checkStillSubscription } from './checkStillSubscription.function.js';
import { emitSubContext } from './processSubscribeWith.function.js';

export function processUpdateSubscribe(
  newValue: TemplateValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const resultNum = checkStillSubscription(
    newValue as TemplateValue, // subValue,
    contextItem,
    ownerSupport,
  )

  if(resultNum === -1 && (newValue as SubscribeValue).callback) {
    
    const subContext = contextItem.subContext as SubContext
    // emitSubScriptionAsIs(newValue as SubscribeValue, subContext)
    emitSubContext(newValue as SubscribeValue, subContext)

    // processUpdateContext(ownerSupport, [subContext.contextItem as ContextItem])
  }
}
