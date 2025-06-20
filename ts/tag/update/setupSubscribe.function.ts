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
  observables: LikeObservable<any>[],
  contextItem: AdvancedContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
  callback?: SubscribeCallback<any>,
  appendTo?: Element,
  insertBeforeOriginal?: Text, // optional but will always be made
): SubContext {
  const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal)

  const subContext = setupSubscribeCallbackProcessor(
    observables,
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
  observables: LikeObservable<any>[],
  ownerSupport: AnySupport, // ownerSupport ?
  counts: TagCounts, // used for animation stagger computing
  insertBefore: Text,
  callback?: SubscribeCallback<any>,
): SubContext {
  const component = getSupportWithState(ownerSupport)
  
  let onOutput = function onSubValue(value: TemplateValue) {
    // const aContext = subContext.contextItem as AdvancedContextItem
    // aContext.tagJsVar = valueToTagJsVar(value) as any

    onFirstSubContext(
      value,
      subContext,
      ownerSupport,
      counts,
      insertBefore,
    )
    
    checkToPaint(syncRun)

    // MUTATION: from now on just run update
    onOutput = function subscriptionUpdate(updateValue: TemplateValue) {
      const aContext = subContext.contextItem as AdvancedContextItem

      forceUpdateExistingValue(
        aContext,
        updateValue,
        ownerSupport,
        { added: 0, removed: 0 }
      )

      checkToPaint(syncRun)
    }
  }
  
  // onValue mutates so function below calls original and mutation
  function valueHandler(
    value: TemplateValue,
    index: number,
  ) {
    subContext.lastValues[index] = value

    valuesHandler( subContext.lastValues )
  }

  function valuesHandler(
    values: TemplateValue[],
  ) {
    const newComponent = component.subject.global.newest
    syncSupports(newComponent, component)

    if(subContext.callback) {
      const responseValue = (subContext.callback as any)(...values)
      onOutput(responseValue)
      return
    }

    onOutput( values[0] )
  }

  let syncRun = true

  const subContext: SubscriptionContext = {
    lastValues: [],
    valueHandler,
    valuesHandler,
    callback,
    subscriptions: [],
  }

  // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
  observables.forEach((observable, index) => {    
    syncRun = true
    subContext.subscriptions.push(
      observable.subscribe( value => valueHandler(value, index) )
    )
    syncRun = false
  })

  return subContext
}

export function deleteAndUnsubscribe(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subscription = contextItem.subContext as SubscriptionContext

  subscription.subscriptions.forEach(sub => sub.unsubscribe())

  return deleteSubContext(contextItem, ownerSupport)
}

function checkToPaint(
  syncRun: boolean
) {
  if(!syncRun && !setUseMemory.stateConfig.support) {
    paint()
  }
}