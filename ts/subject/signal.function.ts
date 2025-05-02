import { Counts } from '../interpolations/interpolateTemplate.js'
import { state } from '../state/index.js'
import { ContextItem } from '../tag/Context.types.js'
import { AnySupport } from '../tag/getSupport.function.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { processSignal } from '../tag/update/processSubscribe.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { ProcessInit } from './ProcessInit.type.js'

type Subscriber = <T>(newValue?: T) => any

/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export function signal<T>(initialValue: T) {
    const support = getSupportInCycle()

    if(support) {
        return state(() => Signal(initialValue))
    }

    return Signal(initialValue)
}

export type SignalObject = {
    tagJsType: typeof ValueTypes.signal
    value: any
    subscribe: any
    processInit: ProcessInit
}

/** Creates object with "value" key and ability to "subscribe" to value changes */
export function Signal<T>(initialValue: T): SignalObject {
    let value: T = initialValue
    const subscribers: Set<Subscriber> = new Set()

    return {
        tagJsType: ValueTypes.signal,
        processInit: processSignal,
        
        get value() {
          return value
        },
        set value(newValue: T) {
            if (value !== newValue) {
                value = newValue
                // Notify all subscribers
                subscribers.forEach(callback => callback(newValue))
            }
        },
        subscribe(callback: Subscriber) {
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
