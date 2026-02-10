import { Subject } from '../subject/index.js';
import { LikeObservable } from '../TagJsTags/processSubscribeWithAttribute.function.js';
/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export declare function subject<T>(initialValue: T): Subject<T>;
export declare namespace subject {
    var _value: <T>(value: T) => Subject<T>;
    var all: {
        <A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F]): Subject<[A, B, C, D, E, F]>;
        <A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E]): Subject<[A, B, C, D, E]>;
        <A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D]): Subject<[A, B, C, D]>;
        <A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C]): Subject<[A, B, C]>;
        <A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B]): Subject<[A, B]>;
        <A>(args: [LikeObservable<A> | A]): Subject<[A]>;
    };
}
