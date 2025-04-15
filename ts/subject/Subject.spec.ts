import { Subject, Subjective } from './Subject.class.js'
import { Resolve, Subscription } from './subject.utils.js'
import { combineLatest } from'./combineLatest.function.js'
import { willCallback, willPromise, willSubscribe } from './will.functions.js'
import { ValueSubject } from './ValueSubject.js'

describe('ValueSubject', () => {
  it('basic', () => {
    const subject = new ValueSubject(0)
    let x: number = 0

    subject.subscribe(y => x = y)

    expect(x).toBe(0)

    subject.next(22)

    expect(x).toBe(22)
    expect(subject.value).toBe(22)
    // expect(subject._value).toBe(22)
  })
})

describe('Subject', () => {
  it('basic', () => {
    const subject = new Subject(0)
    let x: number = 0

    subject.subscribe(y => x = y)

    expect(x).toBe(0)

    subject.next(22)

    expect(x).toBe(22)
    expect(subject.value).toBe(22)
    // expect(subject._value).toBe(22)
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
    subject.next(22)

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

    subject.next(22)
    subject.set(22)
    subject.set(22)
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

    subject.next(22)
    subject.set(22)
    subject.set(22)
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
        () => true,
        () => {
          return 33
        },
      )
  
      expect(x).toBe(0)
  
      piped.subscribe(y => {
        return x = y
      })
  
      expect(x).toBe(0)

      subject.next(22)  
      expect(x).toBe(33)
    })

    it('willCallback', async () => {
      const subject = new Subject(0)
      let x: number = 0
      let afterCallback: number = 0
  
      const piped = subject.pipe(
        w => 'e' + w,
        x => 'd' + x,
        () => true,
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
      setTimeout(() => subject.next(22), 1)
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
        () => true,
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

      setTimeout(() => subject.next(22), 1)

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
        () => true,
        willSubscribe(_z => {
          const subject = new Subject<number>()

          setTimeout(() => {
            subject.next(44)
          }, 1)  

          return subject
        }),
        z => {
          afterCallback = z
          return 55
        },
      )
  
      expect(x).toBe(0)

      setTimeout(() => subject.next(22), 1)

      x = await piped.toPromise()
    
      expect(x).toBe(55)
      expect(afterCallback).toBe(44)
    })
  })

  describe('combineLatest', () => {
    describe('Subjective', () => {
      it('basic', () => {
        const subject1 = new Subjective(0)
        const subject2 = new Subjective(0)
    
        const combined = combineLatest([
          subject1, subject2
        ])
    
        let y = [0,0]
        combined.subscribe(x => y = x)
    
        subject1.value = 1
        subject2.value = 2
    
        expect(subject1.value).toBe(1)
        expect(subject2.value).toBe(2)
  
        expect(y[0]).toBe(1)
        expect(y[1]).toBe(2)
      })


      it('complex', async () => {
        const subject1 = new Subjective(0)
        const subject2 = new Subjective(0)
    
        const combined = Subject.all([
          subject1, subject2, 'something-else'
        ]).pipe(
          x => {
            expect(x).toBeDefined()
            expect(x.length).toBe(3)
            expect(x[2]).toBe('something-else')
            ++z
            return 33
          }
        )
    
        let y: number = 0
        let z: number = 0
        combined.subscribe(x => y = x)
    
        subject1.value = 1
        subject2.value = 2
  
        expect(subject1.value).toBe(1)
        expect(subject2.value).toBe(2)
    
        expect(y).toBe(33)
        expect(z).toBe(1)
      })
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

      subject1.next(1)
      subject2.next(2)
  
      expect(y).toBe(33)
      expect(z).toBe(1)
    })
  })

  describe('Subject.all', () => {
    it('basic', () => {
      const subject1 = new Subject(0)
      const subject2 = new Subject(0)
  
      const combined = Subject.all([
        subject1, subject2, 'something-else'
      ])
  
      let y = [0,0] as (string | number)[]
      combined.subscribe(x => y = x)
  
      subject1.next(1)
      subject2.next(2)

      expect(subject1.value).toBe(1)
      expect(subject2.value).toBe(2)

      expect(subject1.value).toBe(1)
      expect(subject2.value).toBe(2)
  
      expect(y[0]).toBe(1)
      expect(y[1]).toBe(2)
    })
  })
})
