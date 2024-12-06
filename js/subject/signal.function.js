export function signal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();
    return {
        get value() {
            return value;
        },
        set value(newValue) {
            if (value !== newValue) {
                value = newValue;
                // Notify all subscribers
                subscribers.forEach(callback => callback(newValue));
            }
        },
        subscribe(callback) {
            callback(value);
            subscribers.add(callback);
            // Return an unsubscribe function
            const unsub = () => subscribers.delete(callback);
            // support traditional unsubscribe
            unsub.unsubscribe = unsub;
            return unsub;
        },
    };
}
//# sourceMappingURL=signal.function.js.map