import { isSubjectInstance } from '../isInstance.js'
import { LikeObservable } from '../tagJsVars/processSubscribeWithAttribute.function.js'
import { combineLatest } from './combineLatest.function.js'
import { UnaryFunction as OperatorFunction, SubjectSubscriber, Subscription, getSubscription, runPipedMethods } from './subject.utils.js'

export type OnSubscription<T> = (subscription: Subscription<T>) => unknown

export class Subject<T> implements LikeObservable<T> {
  // private?
  methods: OperatorFunction<any, any, any>[] = []
  isSubject = true
  // private?
  subscribers: Subscription<T>[] = []
  subscribeWith?: (x: SubjectSubscriber<T>) => Subscription<T>
  
  public value?: any

  constructor(
    value?: T,
    // private? - only used by extending classes
    public onSubscription?: OnSubscription<T>
  ) {
    // defineValueOn(this)
    if(arguments.length > 0) {
      this.value = value
    }
  }

  subscribe(callback: SubjectSubscriber<T>) {
    const subscription = getSubscription(this, callback, this.subscribers)

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
    
    if(this.onSubscription) {
      this.onSubscription(subscription)
    }
    
    return subscription
  }

  next(value?: T) {
    this.value = value
    this.emit()
  }
  set = this.next.bind(this)
  
  emit() {
    const value = this.value as any

    // Notify all subscribers with the new value
    // const subs = [...this.subscribers] // subs may change as we call callbacks
    const subs = this.subscribers // subs may change as we call callbacks
    // const length = subs.length
    for (const sub of subs) {
      sub.callback(value, sub)
    }
  }

  toPromise(): Promise<T> {
    return new Promise(res => {
      this.subscribe((x, subscription) => {
        subscription.unsubscribe()
        res(x)
      })
    })
  }

  /** like toPromise but faster.
   * Once called, unsubscribe occurs.
   * No subscription to manage UNLESS the callback will never occur THEN subscription needs to be closed with result.unsubscribe() */
  toCallback(callback: (x: T) => any) {
    const subscription = this.subscribe((x, runtimeSub) => {
      const tagJsUnsub = runtimeSub?.unsubscribe
      if(tagJsUnsub) {
        tagJsUnsub() // its from taggedjs
      } else {
        setTimeout(() => subscription.unsubscribe(), 0)
      }

      callback(x)
    })
    // return this 10-2025 remove
    return subscription
  }

  /* tslint:disable:max-line-length */
  pipe(): Subject<T>;
  pipe<A, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>): LikeObservable<A>;
  pipe<A, B, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>): LikeObservable<B>;
  pipe<A, B, C, RESOLVE>(op1: OperatorFunction<T, A, RESOLVE>, op2: OperatorFunction<A, B, RESOLVE>, op3: OperatorFunction<B, C, RESOLVE>): LikeObservable<C>;
  pipe<A, B, C, D, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>
  ): LikeObservable<D>;
  pipe<A, B, C, D, E, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>
  ): LikeObservable<E>;
  pipe<A, B, C, D, E, F, RESOLVE>(
    op1: OperatorFunction<T, A, RESOLVE>,
    op2: OperatorFunction<A, B, RESOLVE>,
    op3: OperatorFunction<B, C, RESOLVE>,
    op4: OperatorFunction<C, D, RESOLVE>,
    op5: OperatorFunction<D, E, RESOLVE>,
    op6: OperatorFunction<E, F, RESOLVE>
  ): LikeObservable<F>;
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
    const args = []
    
    if('value' in this) {
      args.push(this.value)
    }

    const subject = new Subject(...args)
    subject.setMethods(operations)
    subject.subscribeWith = (x) => this.subscribe(x)
    subject.next = x => this.next(x)
    return subject
  }

  setMethods(operations: OperatorFunction<any, any, any>[]) {
    this.methods = operations
  }

  /** Wait for all observables to emit before continuing */
  static all<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F]): Subject<[A,B,C,D,E,F]>
  static all<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E]): Subject<[A,B,C,D,E]>
  static all<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D]): Subject<[A,B,C,D]>
  static all<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C]): Subject<[A,B,C]>
  static all<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B]): Subject<[A,B]>
  static all<A>(args: [LikeObservable<A> | A]): Subject<[A]>
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

  static globalSubCount$ = new Subject<number>(0) // for ease of debugging}
}

export class Subjective<T> extends Subject<T> {
  public _value?: T

  constructor(
    ...args: [value?: T, onSubscription?: OnSubscription<T>]
  ) {
    super(...args)
    this._value = args[0]
    defineValueOn(this)
  }

  next(value?: any) {
    this._value = value
    this.emit()
  }

  emit() {
    const value = this._value as any

    // Notify all subscribers with the new value
    // const subs = [...this.subscribers] // subs may change as we call callbacks
    const subs = this.subscribers // subs may change as we call callbacks
    // const length = subs.length
    for (const sub of subs) {
      sub.callback(value, sub)
    }
  }
}

export function defineValueOn(subject: Subjective<any>) {
  Object.defineProperty(subject, 'value', {
    // supports subject.value = x
    set(value) {
      subject._value = value
      subject.emit()
    },
    
    // supports subject.value
    get() {
      return subject._value
    }
  })
}
