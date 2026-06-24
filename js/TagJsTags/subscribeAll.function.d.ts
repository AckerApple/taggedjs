import { LikeObservable, SubscribeCallback } from "./processSubscribeWithAttribute.function.js";
import { SubscribeValue } from "./subscribe.function.js";
export declare function subscribeAll<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F], callback?: SubscribeCallback<[A, B, C, D, E, F]>): SubscribeValue;
export declare function subscribeAll<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E], callback?: SubscribeCallback<[A, B, C, D, E]>): SubscribeValue;
export declare function subscribeAll<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D], callback?: SubscribeCallback<[A, B, C, D]>): SubscribeValue;
export declare function subscribeAll<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C], callback?: SubscribeCallback<[A, B, C]>): SubscribeValue;
export declare function subscribeAll<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B], callback?: SubscribeCallback<[A, B]>): SubscribeValue;
export declare function subscribeAll<A>(args: [LikeObservable<A> | A], callback?: SubscribeCallback<[A]>): SubscribeValue;
