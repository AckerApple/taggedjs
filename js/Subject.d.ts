export type Subscription = (() => void) & {
    unsubscribe: () => any;
};
export type SubjectSubscriber<T> = (value?: T) => unknown;
export interface SubjectLike {
    subscribe?: (callback: (value?: any) => any) => any;
    isSubject?: boolean;
}
export declare class Subject<T> implements SubjectLike {
    value?: T | undefined;
    isSubject: boolean;
    subscribers: SubjectSubscriber<T>[];
    constructor(value?: T | undefined);
    subscribe(callback: SubjectSubscriber<T>): Subscription;
    set(value: any): void;
    next: (value: any) => void;
}
