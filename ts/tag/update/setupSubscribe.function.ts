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
import { ValueTypes } from '../ValueTypes.enum.js'
import { AnySupport } from '../AnySupport.type.js'
import { createAndProcessContextItem } from './createAndProcessContextItem.function.js'

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

    // appendTo = undefined
  }

  const setup = setupSubscribeCallbackProcessor(
    observable,
    contextItem,
    ownerSupport,
    counts,
    callback,
    insertBefore,
  )

  const deleteMe = contextItem.delete = () => {
    setup.contextItem.delete(setup.contextItem)
    setup.subscription.unsubscribe()

    if(appendMarker) {
      const parentNode = appendMarker.parentNode as ParentNode
      parentNode.removeChild(appendMarker)
    }
  }

  contextItem.handler = (
    value: TemplateValue,
    values: unknown[],
    newSupport: AnySupport
  ) => {
    if(!value || !(value as any).tagJsType || (value as any).tagJsType !== ValueTypes.subscribe) {
      deleteMe()
      return 99
    }

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
  ownerSupport: AnySupport, // ownerSupport ?
  counts: Counts, // used for animation stagger computing
  callback?: SubscribeCallback<any>,
  insertBefore?: Text,
): SubscribeMemory {
  const component = getSupportWithState(ownerSupport)
  let lastValue: TemplateValue = undefined
  const getLastValue = () => lastValue

  let onValue = function onSubValue(value: TemplateValue) {
    if(memory.callback) {
      value = memory.callback(value)
    }

    memory.hasEmitted = true

    memory.contextItem = createAndProcessContextItem(
      value as TemplateValue,
      ownerSupport,
      counts,
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

  let syncRun = true
  memory.subscription = observable.subscribe( valueChangeHandler )
  syncRun = false

  return memory
}

type SubscribeMemory = {
  hasEmitted: boolean
  states: StatesSetter[]
  handler: (value: TemplateValue) => void
  getLastValue: () => any
  callback?: SubscribeCallback<any>
  subscription: Subscription
  
  // context: ContextItem[]
  contextItem: ContextItem
}