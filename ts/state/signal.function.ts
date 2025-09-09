import { state } from './index.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { processSignal } from '../tag/update/processSubscribeWith.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { ProcessInit } from '../tag/ProcessInit.type.js'
import { Subscriber, SubscribeFn } from '../tagJsVars/subscribe.function.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { deleteAndUnsubscribe } from '../tag/update/setupSubscribe.function.js'
import { blankHandler } from '../render/dom/blankHandler.function.js'
import { checkSubscribeValueChanged } from '../tagJsVars/subscribeWith.function.js'
import { processUpdateSubscribe } from '../tag/update/processUpdateSubscribe.function.js'


/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export function signal<T>(initialValue: T) {
  const support = getSupportInCycle()

  if(support) {
    return state(() => Signal(initialValue))
  }

  return Signal(initialValue)
}

export type SignalObject<T> = TagJsVar & {
  tagJsType: typeof ValueTypes.signal
  value: any
  subscribe: SubscribeFn<T>
  processInit: ProcessInit
  emit: (value: any) => any
}

/** Creates object with "value" key and ability to "subscribe" to value changes */
export function Signal<T>(initialValue: T): SignalObject<T> {
  let value: T = initialValue
  const subscribers: Set<Subscriber<T>> = new Set()
  const emit = (newValue: any) => {
    // Notify all subscribers
    subscribers.forEach(callback => callback(newValue))
  }

  return {
    tagJsType: ValueTypes.signal,
    
    hasValueChanged: checkSubscribeValueChanged,
    processInitAttribute: blankHandler,
    processInit: processSignal,
    processUpdate: processUpdateSubscribe,

    get value() {
      return value
    },
    
    set value(newValue: T) {
      if (value !== newValue) {
        value = newValue
        emit(newValue)
      }
    },

    destroy: deleteAndUnsubscribe,
    emit,

    subscribe(callback: Subscriber<T>) {
      callback(value) // emit initial value

      subscribers.add(callback)
      
      // Return an unsubscribe function
      const unsub = () => subscribers.delete(callback)
      
      // support traditional unsubscribe
      unsub.unsubscribe = unsub

      return unsub
    },
  }
}
