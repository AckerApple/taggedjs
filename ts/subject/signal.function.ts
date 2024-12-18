import { state } from '../state/index.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'

type Subscriber = <T>(newValue?: T) => any

/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export function signal<T>(initialValue: T) {
    const support = getSupportInCycle()

    if(support) {
        return state(() => Signal(initialValue))
    }

    return Signal(initialValue)
}

/** Creates object with "value" key and ability to "subscribe" to value changes */
export function Signal<T>(initialValue: T) {
    let value: T = initialValue
    const subscribers: Set<Subscriber> = new Set()

    return {
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
