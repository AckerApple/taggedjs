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

  if((contextItem as any as SubContext).hasEmitted !== true) {
    const Observables = contextItem.value.Observables
    if(!Observables) {
      return
    }
    
    const Observable = Observables[0]
    // const subValue = Observable.value
    if( !('value' in Observable) ) {
      return // its never emitted
    }
  }

  if(resultNum === 0 && (newValue as SubscribeValue).callback) {    
    const subContext = contextItem.subContext as SubContext
    emitSubContext(newValue as SubscribeValue, subContext)
  }
}
