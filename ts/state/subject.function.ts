import { AnySupport } from '../tag/Support.class.js'
import { OnSubscription, Subject, ValueSubject } from '../subject/index.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { syncStates } from './syncStates.function.js'

/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export function subject<T>(
  value?: T,
  onSubscription?: OnSubscription<T>
) {
  const oldestState = state(function subjectState() {
    // return setUseMemory.stateConfig.stateArray
    // return setUseMemory.stateConfig.support as AnySupport
    return {
      stateArray: setUseMemory.stateConfig.stateArray,
      states: setUseMemory.stateConfig.states,
    }
  })
  
  const nowSupport = getSupportInCycle() as AnySupport
  return state(function subjectState() {
    const subject = new Subject(value, onSubscription).pipe(x => {
      syncStates(
        nowSupport.state,
        oldestState.stateArray,
        nowSupport.states,
        oldestState.states,
      )
      return x
    })
    return subject
  })
}

subject._value = <T>(value: T) => {
  const oldestState = state(function subjectValue() {
    return {
      stateArray: setUseMemory.stateConfig.stateArray,
      states: setUseMemory.stateConfig.states,
    }
  })

  const nowSupport = getSupportInCycle() as AnySupport
  return state(function subjectValue() {
    const subject = new ValueSubject(value).pipe(x => {
      syncStates(
        nowSupport.state,
        oldestState.stateArray,
        nowSupport.states,
        oldestState.states,
      )
      return x
    })
    return subject
  })  
}

function all<A, B, C, D, E, F>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E, Subject<F> | F]): Subject<[A,B,C,D,E,F]>
function all<A, B, C, D, E>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E]): Subject<[A,B,C,D,E]>
function all<A, B, C, D>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D]): Subject<[A,B,C,D]>
function all<A, B, C>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C]): Subject<[A,B,C]>
function all<A, B>(args: [Subject<A> | A, Subject<B> | B]): Subject<[A,B]>
function all<A>(args: [Subject<A> | A]): Subject<[A]>
function all(args: any[]): Subject<any> {
  const oldestState = state(() => ({
    stateArray: setUseMemory.stateConfig.stateArray,
    states: setUseMemory.stateConfig.states,
  }))
  const nowSupport = getSupportInCycle() as AnySupport
  return Subject.all(args as any).pipe(x => {
    syncStates(
      nowSupport.state,
      oldestState.stateArray,
      nowSupport.states,
      oldestState.states,
    )
    return x
  })
}

subject.all = all