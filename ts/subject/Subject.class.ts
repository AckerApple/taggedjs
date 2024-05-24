import { isSubjectInstance } from "../isInstance"
import { combineLatest } from "./combineLatest.function"
import { OperatorFunction, SubjectLike, SubjectSubscriber, Subscription, getSubscription, runPipedMethods } from "./subject.utils"

export type OnSubscription<T> = (subscription: Subscription<T>) => unknown

export class Subject<T> implements SubjectLike<T> {
  methods: OperatorFunction<any, any, any>[] = []
  isSubject = true
  subscribers: Subscription<T>[] = []
  subscribeWith?: (x: SubjectSubscriber<T>) => Subscription<T>
  _value?: T

  constructor(
    value?: T,
    public onSubscription?: OnSubscription<T>
  ) {
    this._value = value
  }

  get value() {
    return this._value
  }

  set value(newValue) {
    this._value = newValue;
    this.set(newValue)
  }

  subscribe(callback: SubjectSubscriber<T>) {
    const subscription = getSubscription(this, callback)

    // are we within a pipe?
    const subscribeWith = this.subscribeWith
    if(subscribeWith) {
      // are we in a pipe?
      if(this.methods.length) {
        const orgCallback = callback
        callback = (
          value: any,
          // subscription: Subscription,
        ) => {
          runPipedMethods(
            value,
            this.methods,
            lastValue => orgCallback(lastValue, subscription)
          )
        }
      }

      return subscribeWith(callback)
    }

    this.subscribers.push(subscription)
    // Subject.globalSubs.push(subscription) // 🔬 testing
    const count = Subject.globalSubCount$.value as number
    Subject.globalSubCount$.set(count + 1) // 🔬 testing
    
    if(this.onSubscription) {
      this.onSubscription(subscription)
    }
    
    return subscription
  }

  set(value?: any) {
    this._value = value
    
    // Notify all subscribers with the new value
    const subs = [...this.subscribers] // subs may change as we call callbacks
    const length = subs.length
    for (let index=0; index < length; ++index) {
      const sub = subs[index]
      sub.callback(value, sub)
    }
  }
  // next() is available for rxjs compatibility
  next = this.set

  toPromise(): Promise<T> {
    return new Promise(res => {
      this.subscribe((x, subscription) => {
        subscription.unsubscribe()
        res(x)
      })
    })
  }

  /** like toPromise but faster */
  toCallback(callback: (x: T) => any) {
    this.subscribe((x, subscription) => {
      subscription.unsubscribe()
      callback(x)
    })
    return this
  }

  /* tslint:disable:max-line-length */
  pipe(): Subject<T>;
  pipe<A, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>): Subject<A>;
  pipe<A, B, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>): Subject<B>;
  pipe<A, B, C, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>): Subject<C>;
  pipe<A, B, C, D, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>
  ): Subject<D>;
  pipe<A, B, C, D, E, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>
  ): Subject<E>;
  pipe<A, B, C, D, E, F, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>
  ): Subject<F>;
  pipe<A, B, C, D, E, F, G, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>,
    op7: OperatorFunction<F, G, RESOLVE>
  ): Subject<G>;
  pipe<A, B, C, D, E, F, G, H, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>,
    op7: OperatorFunction<F, G, RESOLVE>,
    op8: OperatorFunction<G, H, RESOLVE>
  ): Subject<H>;
  pipe<A, B, C, D, E, F, G, H, I, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>,
    op7: OperatorFunction<F, G, RESOLVE>,
    op8: OperatorFunction<G, H, RESOLVE>,
    op9: OperatorFunction<H, I, RESOLVE>
  ): Subject<I>;
  pipe<A, B, C, D, E, F, G, H, I, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>,
    op7: OperatorFunction<F, G, RESOLVE>,
    op8: OperatorFunction<G, H, RESOLVE>,
    op9: OperatorFunction<H, I, RESOLVE>,
    ...operations: OperatorFunction<any, any, any>[]
  ): Subject<unknown>;
  pipe(...operations: OperatorFunction<any, any, any>[]): Subject<any> {
    const subject = new Subject(this._value)
    subject.methods = operations
    subject.subscribeWith = (x) => this.subscribe(x as any)
    subject.set = x => this.set(x)
    subject.next = subject.set
    return subject
  }

  static all<A, B, C, D, E, F>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E, Subject<F> | F]): Subject<[A,B,C,D,E,F]>
  static all<A, B, C, D, E>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E]): Subject<[A,B,C,D,E]>
  static all<A, B, C, D>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D]): Subject<[A,B,C,D]>
  static all<A, B, C>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C]): Subject<[A,B,C]>
  static all<A, B>(args: [Subject<A> | A, Subject<B> | B]): Subject<[A,B]>
  static all<A>(args: [Subject<A> | A]): Subject<[A]>
  static all(args: any[]): Subject<any> {
    const switched = args.map(arg => {
      if(isSubjectInstance(arg)) return arg;

      // Call the callback immediately with the current value
      const x = new Subject(arg, subscription => {
        subscription.next(arg)
        return subscription    
      })

      return x
    })

    return combineLatest(switched as Subject<any>[]) as any
  }

  static globalSubCount$ = new Subject<number>(0) // for ease of debugging
}
