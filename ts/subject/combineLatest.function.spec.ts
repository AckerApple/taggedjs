import { Subject } from './Subject.class.js'
import { combineLatest } from './combineLatest.function.js'

describe('combineLatest.function', () => {
  it('waits for all subjects before first emit', () => {
    const subject1 = new Subject<number>()
    const subject2 = new Subject<number>()

    const combined = combineLatest([subject1, subject2])

    const values: number[][] = []
    combined.subscribe(x => values.push([...x]))

    subject1.next(1)
    expect(values).toEqual([])

    subject2.next(2)
    expect(values).toEqual([[1, 2]])
  })

  it('emits latest values when any source changes', () => {
    const subject1 = new Subject<number>()
    const subject2 = new Subject<number>()
    const subject3 = new Subject<number>()

    const combined = combineLatest([subject1, subject2, subject3])

    const values: number[][] = []
    combined.subscribe(x => values.push([...x]))

    subject1.next(10)
    subject2.next(20)
    subject3.next(30)
    subject2.next(25)
    subject1.next(11)

    expect(values).toEqual([
      [10, 20, 30],
      [10, 25, 30],
      [11, 25, 30],
    ])
  })

  it('unsubscribes from all source subjects', () => {
    const subject1 = new Subject<number>()
    const subject2 = new Subject<number>()
    const subject3 = new Subject<number>()

    const combined = combineLatest([subject1, subject2, subject3])

    const callback = jest.fn()
    const subscription = combined.subscribe(callback)

    expect(subject1.subscribers.length).toBe(1)
    expect(subject2.subscribers.length).toBe(1)
    expect(subject3.subscribers.length).toBe(1)

    subscription.unsubscribe()

    expect(subject1.subscribers.length).toBe(0)
    expect(subject2.subscribers.length).toBe(0)
    expect(subject3.subscribers.length).toBe(0)

    subject1.next(1)
    subject2.next(2)
    subject3.next(3)

    expect(callback).not.toHaveBeenCalled()
  })
})
