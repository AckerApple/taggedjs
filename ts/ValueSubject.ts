import { Subject } from './Subject.js'

export class ValueSubject<T> extends Subject<T> {
  value: T
  
  constructor(initialValue: T) {
    super()
    this.value = initialValue
  }

  subscribe(callback: any) {
    const unsubscribe = super.subscribe(callback)
    
    // Call the callback immediately with the current value
    callback(this.value)

    return unsubscribe
  }
}
