import { Subject } from './Subject.js'

export class ValueSubject extends Subject {
  value: any
  
  constructor(initialValue: any) {
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
