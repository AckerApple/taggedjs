import { Counts } from '../../interpolations/interpolateTemplate.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { LikeObservable, SubscribeCallback, SubscribeValue } from '../../state/subscribe.function.js'
import { paint, paintAppends } from '../paint.function.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { Subscription } from '../../state/subscribe.function.js'
import { syncSupports } from '../../state/syncStates.function.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { StatesSetter } from '../../state/states.utils.js'
import { BasicTypes, ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'
import { deleteSimpleValue } from '../checkDestroyPrevious.function.js'
import { processUpdateRegularValue, RegularValue } from './processRegularValue.function.js'

export function setupSubscribe(
  observable: LikeObservable<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
  callback?: SubscribeCallback<any>,
  appendTo?: Element,
  insertBefore?: Text,
) {
  let appendMarker: Text | undefined

  // do we need to append now but process subscription later?
  if(appendTo) {
    appendMarker = insertBefore = document.createTextNode('')

    paintAppends.push({
      element: insertBefore,
      relative: appendTo,
    })
  }

  const subscription = setupSubscribeCallbackProcessor(
    observable,
    contextItem,
    ownerSupport,
    counts,
    callback,
    insertBefore,
  )

  contextItem.delete = () => {
    console.log('🗑️ delete subscribe')
    subscription.contextItem.delete(subscription.contextItem)
    subscription.subscription.unsubscribe()

    if(appendMarker) {
      const parentNode = appendMarker.parentNode as ParentNode
      parentNode.removeChild(appendMarker)
    }
  }

  contextItem.handler = (
    value: TemplateValue,
    newSupport: AnySupport,
    contextItem: ContextItem,
    // values: unknown[],
  ) => {
    checkSubscribeFrom(
      value,
      newSupport,
      contextItem,
      subscription,
    )
  }
}

export function setupSubscribeCallbackProcessor(
  observable: LikeObservable<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport, // ownerSupport ?
  counts: Counts, // used for animation stagger computing
  callback?: SubscribeCallback<any>,
  insertBefore?: Text,
): SubscribeMemory {
  const component = getSupportWithState(ownerSupport)
  let lastValue: TemplateValue = undefined
  const getLastValue = () => lastValue

  let onValue = function onSubValue(value: TemplateValue) {
    memory.hasEmitted = true
    memory.contextItem = createAndProcessContextItem(
      value as TemplateValue,
      ownerSupport,
      counts,
      undefined as any,
      insertBefore,
    )

    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {  
      forceUpdateExistingValue(memory.contextItem, value, ownerSupport)

      if(!syncRun && !setUseMemory.stateConfig.support) {
        paint()
      }
    }
  }
  
  // onValue mutates so function below calls original and mutation
  const valueChangeHandler = function subValueProcessor(value: TemplateValue) {
    lastValue = value

    const newComponent = component.subject.global.newest
    syncSupports(newComponent, component)

    if(memory.callback) {
      value = memory.callback(value)
    }

    onValue(value)
  }

  // aka setup
  const memory = {
    hasEmitted: false,
    handler: valueChangeHandler,
    getLastValue,
    callback,
    states: component.states,
  } as SubscribeMemory

  ;(contextItem as any).subscription = memory

  let syncRun = true
  memory.subscription = observable.subscribe( valueChangeHandler )
  syncRun = false

  return memory
}

type SubscribeMemory = {
  hasEmitted: boolean
  states: StatesSetter[]
  
  /** Handles emissions from subject and figures out what to display */
  handler: (value: TemplateValue) => void
  
  /** Needed so we can update the callback whenever we want */
  getLastValue: () => any
  
  callback?: SubscribeCallback<any>
  subscription: Subscription
  
  contextItem: ContextItem
}

function checkSubscribeFrom(
  value: unknown,
  newSupport: AnySupport,
  contextItem: ContextItem,
  subscription: SubscribeMemory,
) {
  if(!value || !(value as any).tagJsType || (value as any).tagJsType !== ValueTypes.subscribe) {
    contextItem.delete(contextItem)
    return 99
  }

  if (!subscription.hasEmitted) {
    return -1
  }

  subscription.callback = (value as SubscribeValue).callback
  subscription.handler(subscription.getLastValue())

  const newComponent = getSupportWithState(newSupport)
  subscription.states = newComponent.states

  return -1
}
