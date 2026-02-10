import { LikeObservable } from '../TagJsTags/processSubscribeWithAttribute.function.js';
import { UnaryFunction as OperatorFunction, SubjectSubscriber, Subscription } from './subject.utils.js';
export type OnSubscription<T> = (subscription: Subscription<T>) => unknown;
export declare class Subject<T> implements LikeObservable<T> {
    onSubscription?: OnSubscription<T> | undefined;
    methods: OperatorFunction<any, any, any>[];
    isSubject: boolean;
    subscribers: Subscription<T>[];
    subscribeWith?: (x: SubjectSubscriber<T>) => Subscription<T>;
    value?: any;
    constructor(value?: T, onSubscription?: OnSubscription<T> | undefined);
    subscribe(callback: SubjectSubscriber<T>): Subscription<any> | Subscription<T>;
    next(value?: T): void;
    set: (value?: T) => void;
    emit(): void;
    toPromise(): Promise<T>;
    /** like toPromise but faster.
     * Once called, unsubscribe occurs.
     * No subscription to manage UNLESS the callback will never occur THEN subscription needs to be closed with result.unsubscribe() */
    toCallback(callback: (x: T) => any): Subscription<any> | Subscription<T>;
    pipe(): Subject<T>;
    pipe<A, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>): Subject<A>;
    pipe<A, B, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>): Subject<B>;
    pipe<A, B, C, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>): Subject<C>;
    pipe<A, B, C, D, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>): Subject<D>;
    pipe<A, B, C, D, E, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>): Subject<E>;
    pipe<A, B, C, D, E, F, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>, op6: OperatorFunction<E, F, RESOLVE>): Subject<F>;
    pipe<A, B, C, D, E, F, G, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>, op6: OperatorFunction<E, F, RESOLVE>, op7: OperatorFunction<F, G, RESOLVE>): Subject<G>;
    pipe<A, B, C, D, E, F, G, H, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>, op6: OperatorFunction<E, F, RESOLVE>, op7: OperatorFunction<F, G, RESOLVE>, op8: OperatorFunction<G, H, RESOLVE>): Subject<H>;
    pipe<A, B, C, D, E, F, G, H, I, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>, op6: OperatorFunction<E, F, RESOLVE>, op7: OperatorFunction<F, G, RESOLVE>, op8: OperatorFunction<G, H, RESOLVE>, op9: OperatorFunction<H, I, RESOLVE>): Subject<I>;
    pipe<A, B, C, D, E, F, G, H, I, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>, op4: OperatorFunction<C, D, RESOLVE>, op5: OperatorFunction<D, E, RESOLVE>, op6: OperatorFunction<E, F, RESOLVE>, op7: OperatorFunction<F, G, RESOLVE>, op8: OperatorFunction<G, H, RESOLVE>, op9: OperatorFunction<H, I, RESOLVE>, ...operations: OperatorFunction<any, any, any>[]): Subject<unknown>;
    setMethods(operations: OperatorFunction<any, any, any>[]): void;
    /** Wait for all observables to emit before continuing */
    static all<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F]): Subject<[A, B, C, D, E, F]>;
    static all<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E]): Subject<[A, B, C, D, E]>;
    static all<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D]): Subject<[A, B, C, D]>;
    static all<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C]): Subject<[A, B, C]>;
    static all<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B]): Subject<[A, B]>;
    static all<A>(args: [LikeObservable<A> | A]): Subject<[A]>;
    static globalSubCount$: Subject<number>;
}
export declare class Subjective<T> extends Subject<T> {
    _value?: T;
    constructor(...args: [value?: T, onSubscription?: OnSubscription<T>]);
    next(value?: any): void;
    emit(): void;
}
export declare function defineValueOn(subject: Subjective<any>): void;
