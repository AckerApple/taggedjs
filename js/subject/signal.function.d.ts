type Subscriber = <T>(newValue?: T) => any;
/** Checks if rendering cycle in process. Then creates object with "value" key and ability to "subscribe" to value changes */
export declare function signal<T>(initialValue: T): {
    value: T;
    subscribe(callback: Subscriber): {
        (): boolean;
        unsubscribe: /*elided*/ any;
    };
};
/** Creates object with "value" key and ability to "subscribe" to value changes */
export declare function Signal<T>(initialValue: T): {
    value: T;
    subscribe(callback: Subscriber): {
        (): boolean;
        unsubscribe: /*elided*/ any;
    };
};
export {};
