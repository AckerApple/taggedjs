import { Subject } from "./Subject.class"
import { Resolve, Subscription } from "./Subject.utils"
import { combineLatest } from "./combineLatest.function"
import { willCallback, willPromise, willSubscribe } from "./will.functions"

describe('Subject', () => {
  it('basic', () => {
    const subject = new Subject(0)
    let x: number = 0

    subject.subscribe(y => x = y)

    expect(x).toBe(0)

    subject.set(22)

    expect(x).toBe(22)
    expect(subject.value).toBe(22)
  })

  it('Subscription - next', () => {
    const subject = new Subject(0)
    let x: number = 0

    const subscription = subject.subscribe(y => x = y)

    expect(x).toBe(0)

    subscription.next(22)

    expect(x).toBe(22)
  })

  it('onSubscribe', () => {
    let subscription: Subscription<number> | undefined = undefined

    const subject = new Subject(0, (sub) => subscription = sub)
    let x: number = 0
    
    expect(subscription).toBeUndefined()

    subject.subscribe(y => x = y)
    
    expect(subscription).toBeDefined()
    expect(x).toBe(0)

    subject.set(22)

    expect(x).toBe(22)
  })

  it('onSubscribe - toPromise', async () => {
    let subscription: Subscription<number> | undefined = undefined

    const subject = new Subject(0, (sub) => subscription = sub)
    let x: number = 0
    
    expect(subscription).toBeUndefined()

    const promise = subject.toPromise()
    
    expect(subscription).toBeDefined()
    expect(x).toBe(0)

    subject.set(22)

    x = await promise

    expect(x).toBe(22)
  })

  it('onSubscribe - toCallback', () => {
    let subscription: Subscription<number> | undefined = undefined

    const subject = new Subject(0, (sub) => subscription = sub)
    let x: number = 0
    
    expect(subscription).toBeUndefined()

    subject.toCallback(y => x = y)
    
    expect(subscription).toBeDefined()
    expect(x).toBe(0)

    subject.set(22)

    expect(x).toBe(22)
  })
  
  describe('pipes', () => {
    it('pipe', () => {
      const subject = new Subject(0)
      let x: number = 0
  
      const piped = subject.pipe(
        w => 'e' + w,
        x => 'd' + x,
        y => true,
        z => {
          return 33
        },
      )
  
      expect(x).toBe(0)
  
      piped.subscribe(y => {
        return x = y
      })
  
      expect(x).toBe(0)
  
      subject.set(22)
  
      expect(x).toBe(33)
    })

    it('willCallback', async () => {
      const subject = new Subject(0)
      let x: number = 0
      let afterCallback: number = 0
  
      const piped = subject.pipe(
        w => 'e' + w,
        x => 'd' + x,
        y => true,
        willCallback((_z, resolve: Resolve<number>) => {
          setTimeout(() => {
            resolve(44)
          }, 1)
        }),
        z => {
          afterCallback = z
          return 55
        },
      )
  
      expect(x).toBe(0)

      setTimeout(() => subject.set(22), 1)

      x = await piped.toPromise()
    
      expect(x).toBe(55)
      expect(afterCallback).toBe(44)
    })    

    it('willPromise', async () => {
      const subject = new Subject(0)
      let x: number = 0
      let afterCallback: number = 0
  
      const piped = subject.pipe(
        w => 'e' + w,
        x => 'd' + x,
        y => true,
        willPromise(_z => {
          return new Promise<number>(resolve => {
            setTimeout(() => {
              resolve(44)
            }, 1)  
          })
        }),
        z => {
          afterCallback = z
          return 55
        },
      )
  
      expect(x).toBe(0)

      setTimeout(() => subject.set(22), 1)

      x = await piped.toPromise()
    
      expect(x).toBe(55)
      expect(afterCallback).toBe(44)
    })

    it('willSubscribe', async () => {
      const subject = new Subject(0)
      let x: number = 0
      let afterCallback: number = 0
  
      const piped = subject.pipe(
        w => 'e' + w,
        x => 'd' + x,
        y => true,
        willSubscribe(_z => {
          const subject = new Subject<number>()

          setTimeout(() => {
            subject.set(44)
          }, 1)  

          return subject
        }),
        z => {
          afterCallback = z
          return 55
        },
      )
  
      expect(x).toBe(0)

      setTimeout(() => subject.set(22), 1)

      x = await piped.toPromise()
    
      expect(x).toBe(55)
      expect(afterCallback).toBe(44)
    })
  })

  describe('combineLatest', () => {
    it('basic', () => {
      const subject1 = new Subject(0)
      const subject2 = new Subject(0)
  
      const combined = combineLatest([
        subject1, subject2
      ])
  
      let y = [0,0]
      combined.subscribe(x => y = x)
  
      subject1.set(1)
      subject2.set(2)
  
      expect(y[0]).toBe(1)
      expect(y[1]).toBe(2)
    })

    it('combine pipe', () => {
      const subject1 = new Subject(0)
      const subject2 = new Subject(0)
  
      const combined = combineLatest([
        subject1, subject2
      ]).pipe(
        x => {
          expect(x).toBeDefined()
          expect(x.length).toBe(2)
          ++z
          return 33
        }
      )
  
      let y: number = 0
      let z: number = 0
      combined.subscribe(x => y = x)
  
      subject1.set(1)
      subject2.set(2)
  
      expect(y).toBe(33)
      expect(z).toBe(1)
    })
  })
})