import { ProcessInit } from "../subject/ProcessInit.type.js";
import { ValueTypes } from "../tag/index.js";
import { StatesSetter } from "./states.utils.js";
export type Subscription = {
    unsubscribe: () => any;
};
export type LikeObservable<T> = {
    subscribe: (callback: (arg: T) => any) => (Subscription);
};
export type SubscribeCallback<T> = (data: T) => any;
export declare function subscribe<T>(Observable: LikeObservable<T>, callback?: SubscribeCallback<T>): SubscribeValue;
export type SubscribeValue = {
    tagJsType: typeof ValueTypes.subscribe;
    processInit: ProcessInit;
    states: StatesSetter[];
    Observable: LikeObservable<any>;
    callback?: SubscribeCallback<any>;
};
