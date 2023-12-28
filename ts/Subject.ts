export type Subscription = (() => void) & {
  unsubscribe: () => any
}

type Subscriber = () => any

export class Subject {
  isSubject = true
  subscribers: Subscriber[] = []
  value?: any
  // unsubcount = 0 // 🔬 testing

  subscribe(callback: Subscriber) {
    this.subscribers.push(callback)
    ;(Subject as any).globalSubs.push(callback) // 🔬 testing

    ++(Subject as any).globalSubCount

    const unsubscribe: Subscription = () => {
      removeSubFromArray(this.subscribers, callback)
      removeSubFromArray((Subject as any).globalSubs, callback) // 🔬 testing
      --(Subject as any).globalSubCount
    }

    // Return a function to unsubscribe from the BehaviorSubject
    unsubscribe.unsubscribe = unsubscribe

    return unsubscribe
  }

  set(value: any) {
    this.value = value
    
    // Notify all subscribers with the new value
    this.subscribers.forEach((callback: any) => {
      callback.value = value
      callback(value)
    })
  }
  next = this.set
}

function removeSubFromArray(
  subscribers: Subscriber[],
  callback: Subscriber,
) {
  const index = subscribers.indexOf(callback)
  if (index !== -1) {
    subscribers.splice(index, 1)
  }
}

;(Subject as any).globalSubCount = 0 // for ease of debugging
;(Subject as any).globalSubs = [] // 🔬 testing
