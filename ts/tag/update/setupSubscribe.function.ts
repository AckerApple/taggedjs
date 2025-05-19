import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { AdvancedContextItem, ContextItem } from '../Context.types.js'
import { LikeObservable, SubscribeCallback, SubscribeValue } from '../../state/subscribe.function.js'
import { paint, paintAppend, paintAppends, paintCommands, paintRemover } from '../../render/paint.function.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { Subscription } from '../../state/subscribe.function.js'
import { syncSupports } from '../../state/syncStates.function.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { StatesSetter } from '../../state/states.utils.js'
import { empty, ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { tagValueUpdateHandler } from './tagValueUpdateHandler.function.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'

export function setupSubscribe(
  observable: LikeObservable<any>,
  contextItem: AdvancedContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
  callback?: SubscribeCallback<any>,
  appendTo?: Element,
  insertBefore?: Text,
): SubscribeMemory {
  let appendMarker: Text | undefined

  // do we need to append now but process subscription later?
  if(appendTo) {
    appendMarker = insertBefore = document.createTextNode(empty)

    paintAppends.push({
      processor: paintAppend,
      args: [appendTo, insertBefore]
    })
  }

  const subscription = setupSubscribeCallbackProcessor(
    observable,
    ownerSupport,
    counts,
    callback,
    insertBefore,
  )

  subscription.appendMarker = appendMarker

  contextItem.subscription = subscription
  contextItem.delete = deleteSubscribe
  contextItem.handler = checkSubscribeFrom

  return subscription
}

export function setupSubscribeCallbackProcessor(
  observable: LikeObservable<any>,
  ownerSupport: AnySupport, // ownerSupport ?
  counts: Counts, // used for animation stagger computing
  callback?: SubscribeCallback<any>,
  insertBefore?: Text,
): SubscribeMemory {
  const component = getSupportWithState(ownerSupport)
  
  let onValue = function onSubValue(value: TemplateValue) {
    subscription.hasEmitted = true
    subscription.contextItem = createAndProcessContextItem(
      value as TemplateValue,
      ownerSupport,
      counts,
      insertBefore,
    )
/*
    if(!syncRun && !setUseMemory.stateConfig.support) {
      paint()
    }
*/
    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {
      forceUpdateExistingValue(subscription.contextItem, value, ownerSupport)

      if(!syncRun && !setUseMemory.stateConfig.support) {
        paint()
      }
    }
  }
  
  // onValue mutates so function below calls original and mutation
  const valueChangeHandler = function subValueProcessor(value: TemplateValue) {
    subscription.lastValue = value

    const newComponent = component.subject.global.newest
    syncSupports(newComponent, component)

    if(subscription.callback) {
      value = subscription.callback(value)
    }

    onValue(value)
  }

  let syncRun = true

  // aka setup
  const subscription = {
    hasEmitted: false,
    handler: valueChangeHandler,
    callback,
    states: component.states,
    lastValue: undefined,
    subscription: undefined, // must be populated AFTER "subscription" variable defined incase called on subscribe
  } as any as SubscribeMemory

  subscription.subscription = observable.subscribe( valueChangeHandler )
  syncRun = false

  return subscription
}

export type SubscribeMemory = {
  hasEmitted: boolean
  deleted: boolean
  states: StatesSetter[]
  
  /** Handles emissions from subject and figures out what to display */
  handler: (value: TemplateValue) => void
  lastValue: any
  
  callback?: SubscribeCallback<any>
  subscription: Subscription
  appendMarker?: Text
  
  contextItem: AdvancedContextItem
}

function checkSubscribeFrom(
  newValue: unknown,
  ownerSupport: AnySupport,
  contextItem: ContextItem,
) {
  if(!newValue || !(newValue as any).tagJsType || (newValue as any).tagJsType !== ValueTypes.subscribe) {
    (contextItem as AdvancedContextItem).delete(contextItem, ownerSupport)

    updateToDiffValue(
      newValue as TemplateValue,
      contextItem,
      ownerSupport,
      99
    )
    return 99
  }

  const subscription = contextItem.subscription as SubscribeMemory
  if (!subscription.hasEmitted) {
    return -1
  }

  subscription.callback = (newValue as SubscribeValue).callback
  subscription.handler(subscription.lastValue)

  const newComponent = getSupportWithState(ownerSupport)
  subscription.states = newComponent.states

  return -1
}

function deleteSubscribe(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subscription = contextItem.subscription as SubscribeMemory

  subscription.deleted = true
  delete contextItem.subscription
  subscription.subscription.unsubscribe()
  
  const appendMarker = subscription.appendMarker
  if(appendMarker) {
    paintCommands.push({
      processor: paintRemover,
      args: [appendMarker],
    })
    delete subscription.appendMarker
  }
  
  delete (contextItem as any).delete
  // delete contextItem.handler
  contextItem.handler = tagValueUpdateHandler
  
  
  if(!subscription.hasEmitted) {
    return
  }

  subscription.contextItem.delete(subscription.contextItem, ownerSupport)

  return 77
}