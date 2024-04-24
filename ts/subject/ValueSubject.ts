import { Subject } from './Subject.class'
import { SubjectSubscriber, Subscription } from './Subject.utils'

type ValueSubjectSubscriber<T> = (
  value: T,
  subscription: Subscription<T>,
  // ...value: T[]
  // subscription: Subscription,
) => unknown

export class ValueSubject<T> extends Subject<T> {
  constructor(public value: T) {
    super(value)
  }

  subscribe(callback: ValueSubjectSubscriber<T>) {
    const subscription = super.subscribe(callback as SubjectSubscriber<T>)
    
    // Call the callback immediately with the current value
    callback(this.value, subscription)

    return subscription
  }
}
