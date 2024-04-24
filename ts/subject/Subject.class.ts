import { Handler, OperatorFunction, SubjectLike, SubjectSubscriber, Subscription, setHandler } from "./Subject.utils"

type OnSubscription<T> = (subscription: Subscription<T>) => unknown

export class Subject<T> implements SubjectLike<T> {
  methods: OperatorFunction<any, any, any>[] = []
  isSubject = true
  subscribers: Subscription<T>[] = []
  subscribeWith?: (x: SubjectSubscriber<T>) => Subscription<T>
  // unsubcount = 0 // 🔬 testing

  constructor(
    public value?: T,
    public onSubscription?: OnSubscription<T>
  ) {}

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
    SubjectClass.globalSubs.push(subscription) // 🔬 testing
    
    if(this.onSubscription) {
      this.onSubscription(subscription)
    }
    
    return subscription
  }

  set(value?: any) {
    this.value = value
    
    // Notify all subscribers with the new value
    this.subscribers.forEach(sub => {
      // (sub.callback as any).value = value
      sub.callback(value, sub)
    })
  }
  next = this.set

  toPromise(): Promise<T> {
    return new Promise((res, rej) => {
      this.subscribe((x, subscription) => {
        subscription.unsubscribe()
        res(x)
      })
    })
  }

  // like toPromise but faster
  toCallback(callback: (x: T) => any): void {
    this.subscribe((x, subscription) => {
      subscription.unsubscribe()
      callback(x)
    })
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
    const subject = new Subject<T>()
    subject.methods = operations
    subject.subscribeWith = (x) => this.subscribe(x as any)
    return subject
  }
}

function removeSubFromArray(
  subscribers: Subscription<any>[],
  callback: SubjectSubscriber<any>,
) {
  const index = subscribers.findIndex(sub => sub.callback === callback)
  if (index !== -1) {
    subscribers.splice(index, 1)
  }
}

const SubjectClass = Subject as typeof Subject & {
  globalSubCount$: Subject<number>
  globalSubs: Subscription<any>[]
}
SubjectClass.globalSubs = [] // 🔬 for testing
SubjectClass.globalSubCount$ = new Subject() // for ease of debugging
SubjectClass.globalSubCount$.set(0)

function getSubscription<T>(
  subject: Subject<T>,
  callback: SubjectSubscriber<any>
) {
  const countSubject = SubjectClass.globalSubCount$ as {value: number}
  SubjectClass.globalSubCount$.set( countSubject.value + 1 )

  const subscription: Subscription<any> = () => {
    subscription.unsubscribe()
  }

  subscription.callback = callback
  subscription.subscriptions = []

  // Return a function to unsubscribe from the BehaviorSubject
  subscription.unsubscribe = () => {
    removeSubFromArray(subject.subscribers, callback) // each will be called when update comes in
    removeSubFromArray(SubjectClass.globalSubs, callback) // 🔬 testing
    SubjectClass.globalSubCount$.set( countSubject.value - 1 )
    
    // any double unsubscribes will be ignored
    subscription.unsubscribe = () => subscription

    // unsubscribe from any combined subjects
    subscription.subscriptions.forEach(subscription => subscription.unsubscribe())
    
    return subscription
  }

  subscription.add = (sub: Subscription<T>) => {
    subscription.subscriptions.push( sub )
    return subscription
  }

  subscription.next = (value: any) => {
    callback(value, subscription)
  }

  return subscription
}

function runPipedMethods(
  value: any,
  methods: OperatorFunction<any, any, any>[],
  onComplete: (lastValue: any) => any
) {
  const cloneMethods = [...methods]
  
  const firstMethod = cloneMethods.shift() as OperatorFunction<any, any, any>

  const next = (newValue: any) => {
    if(cloneMethods.length) {
      return runPipedMethods(newValue, cloneMethods, onComplete)
    }

    onComplete(newValue)
    // return newValue = next
  }

  let handler: Handler<any> = next

  const setHandler: setHandler<any> = (x: Handler<any>) => handler = x
  const pipeUtils = {setHandler, next}
  const methodResponse = firstMethod(value, pipeUtils)
  handler(methodResponse)
}
