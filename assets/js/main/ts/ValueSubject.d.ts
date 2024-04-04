import { Subject } from './Subject';
type ValueSubjectSubscriber<T> = (value: T) => unknown;
export declare class ValueSubject<T> extends Subject<T> {
    value: T;
    constructor(value: T);
    subscribe(callback: ValueSubjectSubscriber<T>): import("./Subject").Subscription;
}
export {};
