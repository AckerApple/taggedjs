import { state } from '../index.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { Signal, SignalObject } from './signal.function.js'

export type SignalArray<T> = SignalObject<Array<T>> & Array<T>

/** returns a signal that contains an array but also supplies array methods */
export function array<T>(
  initialValue: T[] = []
): SignalArray<T> {
  const support = getSupportInCycle()

  if(support) {
      return state(() => firstSignal(Signal(initialValue)))
  }

  return firstSignal(Signal(initialValue))
}

function firstSignal(
  sig: SignalObject<any>,
) {
  ;['push', 'pop', 'splice', 'shift', 'unshift'].forEach(action => {
    (sig as any)[action] = (...args: any[]) => {
        const result = sig.value[action](...args)
        sig.emit( sig.value )
        return result
    }
  })

  Object.defineProperty(sig, 'length', {
    get() {
      return sig.value.length
    },
    set(length: number) {
      sig.value.length = length
      sig.emit(sig.value)
      return sig.value.length
    },
  })

  return sig as any
}
