import { Subject } from "./Subject.class"

export type Resolve<T> = (x: T) => any

export type Subscription<T> = ((arg: T) => void) & {
  callback: SubjectSubscriber<T>,
  unsubscribe: () => Subscription<T>
  add: (sub: Subscription<T>) => Subscription<T>
  next: (value?: T) => any
  subscriptions: Subscription<T>[] // support for combing subjects
}

export type SubjectSubscriber<T> = (
  value: T,
  subscription: Subscription<T>, // allows immediate unsubscribe
) => unknown

export type SubjectLike<T> = {
  subscribe?: (callback: SubjectSubscriber<T>) => any,
  isSubject?: boolean
}

export type Closer<T> = {
  createCallback: (callback: (result: T) => any) => any
  subscribe: (subject: SubjectLike<T>) => any
}

export type Handler<T> = (x: any) => T
export type setHandler<T> = (x: Handler<T>) => any

export interface UnaryFunction<T, R, RESOLVE> {
  (
    source: T, // lastValue
    pipeUtils: PipeUtils<RESOLVE>,
  ): R;
}

export interface OperatorFunction<T, R, RESOLVE> extends UnaryFunction<T, R, RESOLVE> {}

export type PipeUtils<H> = {
  setHandler: setHandler<H>
  next: (newValue: any) => any
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

export function getSubscription<T>(
  subject: Subject<T>,
  callback: SubjectSubscriber<any>
) {
  const countSubject = Subject.globalSubCount$ as {value: number}
  Subject.globalSubCount$.set( countSubject.value + 1 )

  const subscription: Subscription<any> = () => {
    subscription.unsubscribe()
  }

  subscription.callback = callback
  subscription.subscriptions = []

  // Return a function to unsubscribe from the BehaviorSubject
  subscription.unsubscribe = () => {
    removeSubFromArray(subject.subscribers, callback) // each will be called when update comes in
    // removeSubFromArray(Subject.globalSubs, callback) // 🔬 testing
    Subject.globalSubCount$.set( countSubject.value - 1 )
    
    // any double unsubscribes will be ignored
    subscription.unsubscribe = () => subscription

    // unsubscribe from any combined subjects
    const subscriptions = subscription.subscriptions
    for (let index = subscriptions.length - 1; index >= 0; --index) {
      subscriptions[index].unsubscribe()
    }
    
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

export function runPipedMethods(
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
  }

  let handler: Handler<any> = next

  const setHandler: setHandler<any> = (x: Handler<any>) => handler = x
  const pipeUtils = {setHandler, next}
  const methodResponse = firstMethod(value, pipeUtils)
  handler(methodResponse)
}
