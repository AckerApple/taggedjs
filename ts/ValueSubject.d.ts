import { Subject } from './Subject';
export declare class ValueSubject<T> extends Subject<T> {
    value: T;
    constructor(value: T);
    subscribe(callback: any): import("./Subject").Subscription;
}
