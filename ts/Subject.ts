export type Subscription = (() => void) & {
  unsubscribe: () => any
}

export type SubjectSubscriber<T> = (value?: T) => unknown

export interface SubjectLike {
  subscribe?: (callback: (value?: any) => any) => any,
  isSubject?: boolean
}

export class Subject<T> implements SubjectLike {
  isSubject = true
  subscribers: SubjectSubscriber<T>[] = []
  // unsubcount = 0 // 🔬 testing

  constructor(public value?: T) {}

  subscribe(callback: SubjectSubscriber<T>) {
    this.subscribers.push(callback)
    SubjectClass.globalSubs.push(callback) // 🔬 testing
    const countSubject = SubjectClass.globalSubCount$ as {value: number}
    SubjectClass.globalSubCount$.set( countSubject.value + 1 )

    const unsubscribe: Subscription = () => {
      unsubscribe.unsubscribe()
    }

    // Return a function to unsubscribe from the BehaviorSubject
    unsubscribe.unsubscribe = () => {
      removeSubFromArray(this.subscribers, callback)
      removeSubFromArray(SubjectClass.globalSubs, callback) // 🔬 testing
      SubjectClass.globalSubCount$.set( countSubject.value - 1 )
      
      // any double unsubscribes will be ignored
      unsubscribe.unsubscribe = () => undefined
    }

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
  subscribers: SubjectSubscriber<any>[],
  callback: SubjectSubscriber<any>,
) {
  const index = subscribers.indexOf(callback)
  if (index !== -1) {
    subscribers.splice(index, 1)
  }
}

const SubjectClass = Subject as typeof Subject & {
  globalSubCount$: Subject<number>
  globalSubs: SubjectSubscriber<any>[]
}
SubjectClass.globalSubs = [] // 🔬 for testing
SubjectClass.globalSubCount$ = new Subject() // for ease of debugging
SubjectClass.globalSubCount$.set(0)