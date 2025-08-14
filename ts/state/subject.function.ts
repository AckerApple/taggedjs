import { AnySupport } from '../tag/AnySupport.type.js'
import { Subject, ValueSubject } from '../subject/index.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { ContextStateMeta, ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { oldSyncStates } from './syncStates.function.js'

/** Create a Subject that on updates will sync state values to keep chained functions using latest variables */
export function subject<T>(
  initialValue: T,
) {
  const support = getSupportInCycle()

  if(support) {
      return state(() => new Subject(initialValue))
  }

  return new Subject(initialValue)
}

subject._value = <T>(value: T) => {
  const oldestState = state(function subjectValue() {
    return {
      state: setUseMemory.stateConfig.state,
      states: setUseMemory.stateConfig.states,
    }
  })

  const nowSupport = getSupportInCycle() as AnySupport
  return state(function subjectValue() {
    const subject = new ValueSubject(value).pipe(x => {
      const context = nowSupport.context as SupportContextItem
      const stateMeta = context.state as ContextStateMeta
      const newer = stateMeta.newer as ContextStateSupport

      oldSyncStates(
        newer.state,
        oldestState.state,
        newer.states,
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
    state: setUseMemory.stateConfig.state,
    states: setUseMemory.stateConfig.states,
  }))
  const nowSupport = getSupportInCycle() as AnySupport
  return Subject.all(args as any).pipe(x => {
    const context = nowSupport.context as SupportContextItem
    const stateMeta = context.state as ContextStateMeta
    const newer = stateMeta.newer
    if (newer) {
      oldSyncStates(
        newer.state,
        oldestState.state,
        newer.states,
        oldestState.states,
      )
    }
    return x
  })
}

subject.all = all