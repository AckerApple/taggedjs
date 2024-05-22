import { Subject } from "./Subject.class"
import { SubjectSubscriber, Subscription } from "./subject.utils"

export function combineLatest(
  subjects: Subject<any>[],
): Subject<any> {
  const output = new Subject()
  
  const subscribe = (
    callback: SubjectSubscriber<any>
  ) => {
    const valuesSeen: true[] = []
    const values: any[] = []    
    const setValue = (x: any, index: number) => {
      valuesSeen[index] = true
      values[index] = x
      const countMatched = valuesSeen.length === subjects.length

      if(!countMatched) {
        return
      }

      for (let index = valuesSeen.length - 1; index >= 0; --index) {
        if(!valuesSeen[index]) {
          return
        }
      }

      // everyone has reported values
      callback(values, subscription)
    }

    const clones = [...subjects]
    const firstSub = clones.shift() as Subject<any>
    const subscription: Subscription<any> = firstSub.subscribe(x => setValue(x, 0))
    
    const subscriptions = clones.map((subject, index) => subject.subscribe(x => setValue(x, index + 1)))

    subscription.subscriptions = subscriptions

    return subscription
  }

  output.subscribeWith = subscribe

  return output
}