import { ContextItem } from '../ContextItem.type.js'
import { LikeObservable, SubscribeValue } from '../../tagJsVars/subscribe.function.js'
import { paint } from '../../render/paint.function.js'
import { setUseMemory } from '../../state/setUseMemory.object.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { AnySupport } from '../index.js'
import { deleteSubContext } from './deleteContextSubContext.function.js'
import { onFirstSubContext } from './onFirstSubContext.function.js'
import { OnSubOutput, SubContext, SubscriptionContext } from './SubContext.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { guaranteeInsertBefore } from '../guaranteeInsertBefore.function.js'
import { valueToTagJsVar } from '../../tagJsVars/valueToTagJsVar.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { processUpdateSubscribe } from './processUpdateSubscribe.function.js'
import { removeContextInCycle, setContextInCycle } from '../cycles/setContextInCycle.function.js'

export function setupSubscribe(
  value: SubscribeValue,
  contextItem: ContextItem,
  ownerSupport: AnySupport,
  insertBeforeOriginal?: Text, // optional but will always be made
  appendTo?: Element,
): SubContext {
  const observables = value.Observables
  const { appendMarker, insertBefore } = guaranteeInsertBefore(appendTo, insertBeforeOriginal)

  let onOutput = function onSubValue(
    value: TemplateValue,
    syncRun: boolean,
    subContext: SubscriptionContext,
  ) {
    onFirstSubContext(
      value,
      subContext,
      ownerSupport,
      insertBefore,
    )
    
    checkToPaint(syncRun)

    // MUTATION: from now on just run update
    onOutput = subContext.tagJsVar.onOutput = function subscriptionUpdate(
      updateValue: TemplateValue,
      syncRun: boolean,
      subContext: SubscriptionContext,
    ) {
      const aContext = subContext.contextItem as ContextItem
      
      forceUpdateExistingValue(
        aContext,
        updateValue,
        ownerSupport,
      )

      aContext.tagJsVar.processUpdate(updateValue, aContext, ownerSupport, [updateValue])
      // processUpdateContext(ownerSupport)

      checkToPaint(syncRun)
    }
  }

  const subContext = setupSubscribeCallbackProcessor(
    observables,
    ownerSupport,
    (
      value: TemplateValue,
      syncRun: boolean,
      subContext,
    ) => onOutput(value, syncRun, subContext),
    value,
    contextItem,
  )

  subContext.appendMarker = appendMarker

  contextItem.subContext = subContext
  value.processUpdate = processUpdateSubscribe
  value.onOutput = onOutput

  return subContext
}

/** After calling this function you need to set `contextItem.subContext = subContext` */
export function setupSubscribeCallbackProcessor(
  observables: LikeObservable<any>[],
  ownerSupport: AnySupport, // ownerSupport ?
  onOutput: OnSubOutput,
  tagJsVar: SubscribeValue,
  contextItem: ContextItem,
): SubContext {
  // const component = getSupportWithState(ownerSupport)
  
  // onValue mutates so function below calls original and mutation
  function subValueHandler(
    value: TemplateValue,
    index: number,
  ) {
    subContext.lastValues[index] = {
      value,
      tagJsVar: valueToTagJsVar(value),
      oldTagJsVar: subContext.lastValues[index]?.tagJsVar
    }
    
    valuesHandler(
      subContext.lastValues,
      index,
    )
  }

  function valuesHandler(
    newValues: {value: TemplateValue, tagJsVar: TagJsVar}[],
    index: number
  ) {
    const newestParentTagJsVar = subContext.tagJsVar
    if(newestParentTagJsVar?.callback) {
      setContextInCycle(contextItem)
      
      const responseValue = (newestParentTagJsVar.callback as any)( ...newValues.map(x => x.value) )
      onOutput(responseValue, syncRun, subContext)
      
      removeContextInCycle()
      
      return
    }

    onOutput(newValues[index].value, syncRun, subContext)
  }

  let syncRun = true

  const subContext: SubscriptionContext = {
    lastValues: [],
    subValueHandler,
    valuesHandler,
    tagJsVar,
    subscriptions: [],
  }

  // HINT: Must subscribe AFTER initial variable created above incase subscribing causes immediate run
  observables.forEach((observable, index) => {    
    syncRun = true
    subContext.subscriptions.push(
      observable.subscribe( value => subValueHandler(value, index) )
    )
    syncRun = false
  })

  tagJsVar.onOutput = onOutput

  return subContext
}

export function unsubscribeContext(
  contextItem: ContextItem,
) {
  const subscription = contextItem.subContext as SubscriptionContext
  const subscriptions = subscription.subscriptions
  
  subscriptions.forEach(sub => sub.unsubscribe())
  delete contextItem.subContext
}

export function deleteAndUnsubscribe(
  contextItem: ContextItem,
  ownerSupport: AnySupport,
) {
  const subContext = contextItem.subContext as SubContext
  unsubscribeContext(contextItem)
  return deleteSubContext(subContext, ownerSupport)
}

export function checkToPaint(
  syncRun: boolean
) {
  if(!syncRun && !setUseMemory.stateConfig.support) {
    paint()
  }
}