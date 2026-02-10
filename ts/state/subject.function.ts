import { AnySupport } from '../tag/index.js'
import { Subject, ValueSubject } from '../subject/index.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { ContextStateMeta, ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { setUseMemory } from './setUseMemory.object.js'
import { state } from './state.function.js'
import { LikeObservable } from '../TagJsTags/processSubscribeWithAttribute.function.js'

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

  //const nowSupport = getSupportInCycle() as AnySupport
  return state(function subjectValue() {
    const subject = new ValueSubject(value).pipe(x => {
      /*
      const context = nowSupport.context as SupportContextItem
      const stateMeta = context.state as ContextStateMeta
      const newer = stateMeta.newer as ContextStateSupport

      oldSyncStates(
        newer.state,
        oldestState.state,
        newer.states,
        oldestState.states,
      )
      */
      return x
    })
    return subject
  })  
}

function all<A, B, C, D, E, F>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E, LikeObservable<F> | F]): Subject<[A,B,C,D,E,F]>
function all<A, B, C, D, E>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D, LikeObservable<E> | E]): Subject<[A,B,C,D,E]>
function all<A, B, C, D>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C, LikeObservable<D> | D]): Subject<[A,B,C,D]>
function all<A, B, C>(args: [LikeObservable<A> | A, LikeObservable<B> | B, LikeObservable<C> | C]): Subject<[A,B,C]>
function all<A, B>(args: [LikeObservable<A> | A, LikeObservable<B> | B]): Subject<[A,B]>
function all<A>(args: [LikeObservable<A> | A]): Subject<[A]>
function all(args: any[]): Subject<any> {
  const oldestState = state(() => ({
    state: setUseMemory.stateConfig.state,
    states: setUseMemory.stateConfig.states,
  }))
  const nowSupport = getSupportInCycle() as AnySupport
  return Subject.all(args as any).pipe(x => {
    /*
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
      */
    return x
  }) as any
}

subject.all = all