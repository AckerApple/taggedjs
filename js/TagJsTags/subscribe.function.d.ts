import { ValueTypes } from "../tag/index.js";
import { TagJsTag } from "./TagJsTag.type.js";
import { OnSubOutput } from "../tag/update/SubContext.type.js";
import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js";
/** Have an html tagged value as value of subscribe emissions. Automatically unsubscribes for you */
export declare function subscribe<T>(Observable: LikeObservable<T>, callback?: SubscribeCallback<T>): SubscribeValue;
export declare namespace subscribe {
    var all: typeof subscribeAll;
}
export type SubscribeValue = TagJsTag & {
    tagJsType: typeof ValueTypes.subscribe;
    withDefault?: any;
    callback?: SubscribeCallback<any>;
    onOutput: OnSubOutput;
    Observables: LikeObservable<any>[];
};
declare function subscribeAll<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F], callback?: SubscribeCallback<[A, B, C, D, E, F]>): SubscribeValue;
declare function subscribeAll<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E], callback?: SubscribeCallback<[A, B, C, D, E]>): SubscribeValue;
declare function subscribeAll<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D], callback?: SubscribeCallback<[A, B, C, D]>): SubscribeValue;
declare function subscribeAll<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C], callback?: SubscribeCallback<[A, B, C]>): SubscribeValue;
declare function subscribeAll<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B], callback?: SubscribeCallback<[A, B]>): SubscribeValue;
declare function subscribeAll<A>(args: [LikeObservable<A> | A], callback?: SubscribeCallback<[A]>): SubscribeValue;
export {};
