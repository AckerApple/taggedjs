import { Subject } from './Subject'

export class ValueSubject<T> extends Subject<T> {
  constructor(public value: T) {
    super(value)
  }

  subscribe(callback: any) {
    const unsubscribe = super.subscribe(callback)
    
    // Call the callback immediately with the current value
    callback(this.value)

    return unsubscribe
  }
}
