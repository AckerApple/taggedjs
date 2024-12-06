
type Subscriber = <T>(newValue?: T) => any

export function signal<T>(initialValue: T) {
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
            callback(value)
            subscribers.add(callback)
            // Return an unsubscribe function
            const unsub = () => subscribers.delete(callback)
            
            // support traditional unsubscribe
            unsub.unsubscribe = unsub

            return unsub
        },
    }
}
