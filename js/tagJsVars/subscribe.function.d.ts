import { ValueTypes } from "../tag/index.js";
import { StatesSetter } from "../state/states.utils.js";
import { TagJsVar } from "./tagJsVar.type.js";
export type LikeSubscription = {
    unsubscribe: () => any;
};
export type Subscriber<T> = (arg: T) => any;
export type SubscribeFn<T> = (callback: Subscriber<T>) => (LikeSubscription);
export type LikeObservable<T> = {
    subscribe: SubscribeFn<T>;
};
export type SubscribeCallback<T> = (data: T) => any;
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export declare function subscribe<T>(Observable: LikeObservable<T>, callback?: SubscribeCallback<T>): SubscribeValue;
export type SubscribeValue = TagJsVar & {
    tagJsType: typeof ValueTypes.subscribe;
    states: StatesSetter[];
    withDefault?: any;
    callback?: SubscribeCallback<any>;
    Observables: LikeObservable<any>[];
};
