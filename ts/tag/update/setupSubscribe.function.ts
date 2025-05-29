import type { TagCounts } from '../TagCounts.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { LikeObservable, SubscribeCallback } from '../../tagJsVars/subscribe.function.js'
import { paint } from '../../render/paint.function.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { syncSupports } from '../../state/syncStates.function.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { deleteSubContext } from './deleteSubContext.function.js'
import { checkSubContext } from './checkSubContext.function.js'
import { onFirstSubContext } from './onFirstSubContext.function.js'
import { SubContext, SubscriptionContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { guaranteeInsertBefore } from '../guaranteeInsertBefore.function.js'
import { ContextItem } from '../ContextItem.type.js'

export function setupSubscribe(
  observable: LikeObservable<any>,
  contextItem: AdvancedContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  callback?: SubscribeCallback<any>,
  appendTo?: Element,
  insertBeforeOriginal?: Text, // optional but will always be made
): SubContext {
  const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal)

  const subContext = setupSubscribeCallbackProcessor(
    observable,
    ownerSupport,
    counts,
    insertBefore,
    callback,
  )

  subContext.appendMarker = appendMarker

  contextItem.subContext = subContext
  contextItem.handler = checkSubContext

  return subContext
}

export function setupSubscribeCallbackProcessor(
  observable: LikeObservable<any>,
  ownerSupport: AnySupport, // ownerSupport ?
  counts: TagCounts, // used for animation stagger computing
  insertBefore: Text,
  callback?: SubscribeCallback<any>,
): SubContext {
  const component = getSupportWithState(ownerSupport)
  
  let onValue = function onSubValue(value: TemplateValue) {
    onFirstSubContext(
      value,
      subContext,
      ownerSupport,
      counts,
      insertBefore,
    )

    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {
      forceUpdateExistingValue(
        subContext.contextItem as AdvancedContextItem,
        value,
        ownerSupport,
        { added: 0, removed: 0 }
      )

      if(!syncRun && !setUseMemory.stateConfig.support) {
        paint()
      }
    }
  }
  
  // onValue mutates so function below calls original and mutation
  function valueHandler(value: TemplateValue) {
    subContext.lastValue = value

    const newComponent = component.subject.global.newest
    syncSupports(newComponent, component)

    if(subContext.callback) {
      value = subContext.callback(value)
    }

    onValue(value)
  }

  let syncRun = true

  const subContext = {
    valueHandler,
    callback,
  } as SubscriptionContext

  // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
  subContext.subscription = observable.subscribe( valueHandler )
  
  syncRun = false

  return subContext
}

export function deleteAndUnsubscribe(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subscription = contextItem.subContext as SubscriptionContext

  subscription.subscription.unsubscribe()

  return deleteSubContext(contextItem, ownerSupport)
}
