import { ProcessInit } from "../tag/ProcessInit.type.js";
import { ValueTypes } from "../tag/index.js";
import { StatesSetter } from "../state/states.utils.js";
export type LikeSubscription = {
    unsubscribe: () => any;
};
export type LikeObservable<T> = {
    subscribe: (callback: (arg: T) => any) => (LikeSubscription);
};
export type SubscribeCallback<T> = (data: T) => any;
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export declare function subscribe<T>(Observable: LikeObservable<T>, callback?: SubscribeCallback<T>): SubscribeValue;
export type SubscribeValue = {
    tagJsType: typeof ValueTypes.subscribe;
    processInit: ProcessInit;
    states: StatesSetter[];
    Observable: LikeObservable<any>;
    withDefault?: any;
    callback?: SubscribeCallback<any>;
};
