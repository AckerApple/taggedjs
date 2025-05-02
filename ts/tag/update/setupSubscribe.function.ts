import { Counts } from '../../interpolations/interpolateTemplate.js'
import { AnySupport } from '../getSupport.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { LikeObservable, SubscribeCallback, SubscribeValue } from '../../state/subscribe.function.js'
import { paint } from '../paint.function.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { Subscription } from '../../state/subscribe.function.js'
import { processFirstSubjectValue } from './processFirstSubjectValue.function.js'
import { syncSupports } from '../../state/syncStates.function.js'
import { forceUpdateExistingValue } from './updateExistingValue.function.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { StatesSetter } from '../../state/states.utils.js'

export function setupSubscribe(
  observable: LikeObservable<any>,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  counts: Counts,
  callback?: SubscribeCallback<any>,
  appendTo?: Element | undefined,
) {
  const setup = setupSubscribeCallbackProcessor(
    observable,
    contextItem,
    ownerSupport,
    counts,
    callback,
    appendTo
  )

  contextItem.delete = () => {
    setup.subscription.unsubscribe()
  }

  contextItem.handler = (
    value: TemplateValue,
    values: unknown[],
    newSupport: AnySupport
  ) => {
    if (!setup.hasEmitted) {
      return
    }

    setup.callback = (value as SubscribeValue).callback
    setup.handler(setup.getLastValue())

    const newComponent = getSupportWithState(newSupport)
    setup.states = newComponent.states
  }
}

export function setupSubscribeCallbackProcessor(
  observable: LikeObservable<any>,
  contextItem: ContextItem,
  support: AnySupport, // ownerSupport ?
  counts: Counts, // used for animation stagger computing
  callback?: SubscribeCallback<any>,
  appendTo?: Element,
) {
  const component = getSupportWithState(support)
  let lastValue: TemplateValue = undefined
  const getLastValue = () => lastValue

  let onValue = function onSubValue(value: TemplateValue) {
    if(memory.callback) {
      value = memory.callback(value)
    }

    memory.hasEmitted = true

    processFirstSubjectValue(
      value,
      contextItem,
      support,
      {...counts},
      syncRun ? appendTo : undefined,
    )

    if(!syncRun && !setUseMemory.stateConfig.support) {
      paint()
    }

    // from now on just run update
    onValue = function subscriptionUpdate(value: TemplateValue) {  
      // processSubUpdate(value, contextItem, support)
      forceUpdateExistingValue(contextItem, value, support)

      if(!syncRun && !setUseMemory.stateConfig.support) {
        paint()
      }
      //paint()
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
  } // as unknown as (ValueSubjectSubscriber<Callback> & ValueSubjectSubscriber<unknown>)

  // aka setup
  const memory = {
    hasEmitted: false,
    handler: valueChangeHandler,
    getLastValue,
    callback,
    // states: [...component.states],
    states: component.states,
  } as {
    hasEmitted: boolean
    states: StatesSetter[]
    handler: typeof valueChangeHandler
    getLastValue: typeof getLastValue
    callback: typeof callback
    subscription: Subscription
  }

  let syncRun = true
  memory.subscription = observable.subscribe( valueChangeHandler )
  // contextItem.subject = value.Observable as any
  syncRun = false

  return memory
}
