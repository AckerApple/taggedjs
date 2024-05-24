import { Subject } from './Subject.class'
import { SubjectSubscriber, Subscription } from './subject.utils'

type ValueSubjectSubscriber<T> = (
  value: T,
  subscription: Subscription<T>,
) => unknown

export class ValueSubject<T> extends Subject<T> {
  declare _value: T

  constructor(value: T) {
    super(value)
  }

  get value() {
    return this._value
  }

  set value(newValue) {
    this._value = newValue;
    this.set(newValue)
  }

  subscribe(callback: ValueSubjectSubscriber<T>) {
    const subscription = super.subscribe(callback as SubjectSubscriber<T>)
    
    // Call the callback immediately with the current value
    callback(this._value, subscription)

    return subscription
  }
}
