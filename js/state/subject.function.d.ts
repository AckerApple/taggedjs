import { Subject } from '../subject/index.js';
/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export declare function subject<T>(initialValue: T): Subject<T>;
export declare namespace subject {
    var _value: <T>(value: T) => Subject<T>;
    var all: {
        <A, B, C, D, E, F>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E, Subject<F> | F]): Subject<[A, B, C, D, E, F]>;
        <A, B, C, D, E>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E]): Subject<[A, B, C, D, E]>;
        <A, B, C, D>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D]): Subject<[A, B, C, D]>;
        <A, B, C>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C]): Subject<[A, B, C]>;
        <A, B>(args: [Subject<A> | A, Subject<B> | B]): Subject<[A, B]>;
        <A>(args: [Subject<A> | A]): Subject<[A]>;
    };
}
