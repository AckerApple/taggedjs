import { Subject, SubjectSubscriber } from './Subject'

type ValueSubjectSubscriber<T> = (value: T) => unknown

export class ValueSubject<T> extends Subject<T> {
  constructor(public value: T) {
    super(value)
  }

  subscribe(callback: ValueSubjectSubscriber<T>) {
    const unsubscribe = super.subscribe(callback as SubjectSubscriber<T>)
    
    // Call the callback immediately with the current value
    callback(this.value)

    return unsubscribe
  }
}
