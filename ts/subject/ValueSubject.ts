import { Subject, defineValueOn } from './Subject.class.js'
import { SubjectSubscriber, Subscription } from './subject.utils.js'

type ValueSubjectSubscriber<T> = (
  value: T,
  subscription: Subscription<T>,
) => unknown

export class ValueSubject<T> extends Subject<T> {
  declare public _value: T

  constructor(public value: T) {
    super(value)

    defineValueOn(this) // if you extend this AND have a constructor, you must call this in your extension
  }

  subscribe(callback: ValueSubjectSubscriber<T>) {
    const subscription = super.subscribe(callback as SubjectSubscriber<T>)
    
    // Call the callback immediately with the current value
    callback(this._value, subscription)

    return subscription
  }
}
