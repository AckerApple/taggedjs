import { OnSubscription, Subject } from "../subject";
import { TagSupport } from "../tag/TagSupport.class";
import { getSupportInCycle } from "../tag/getSupportInCycle.function";
import { setUse } from "./setUse.function";
import { state } from "./state.function";
import { syncStates } from "./syncStates.function";

export function subject<T>(
  value?: T,
  onSubscription?: OnSubscription<T>
) {
  const oldestState = state(() => setUse.memory.stateConfig.array)
  const nowTagSupport = getSupportInCycle() as TagSupport
  return new Subject(value, onSubscription).pipe(x => {
    syncStates(nowTagSupport.memory.state, oldestState)
    return x
  })
}

function all<A, B, C, D, E, F>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E, Subject<F> | F]): Subject<[A,B,C,D,E,F]>
function all<A, B, C, D, E>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D, Subject<E> | E]): Subject<[A,B,C,D,E]>
function all<A, B, C, D>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C, Subject<D> | D]): Subject<[A,B,C,D]>
function all<A, B, C>(args: [Subject<A> | A, Subject<B> | B, Subject<C> | C]): Subject<[A,B,C]>
function all<A, B>(args: [Subject<A> | A, Subject<B> | B]): Subject<[A,B]>
function all<A>(args: [Subject<A> | A]): Subject<[A]>
function all(args: any[]): Subject<any> {
  const oldestState = state(() => setUse.memory.stateConfig.array)
  const nowTagSupport = getSupportInCycle() as TagSupport
  return Subject.all(args as any).pipe(x => {
    syncStates(nowTagSupport.memory.state, oldestState)
    return x
  })
}

subject.all = all