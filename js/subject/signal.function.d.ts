type Subscriber = <T>(newValue?: T) => any;
export declare function signal<T>(initialValue: T): {
    value: T;
    subscribe(callback: Subscriber): {
        (): boolean;
        unsubscribe: any;
    };
};
export {};
