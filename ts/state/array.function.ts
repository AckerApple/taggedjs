import { state } from '../index.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { Signal, SignalObject } from './signal.function.js'

export type SignalArray<T> = SignalObject<Array<T>> & Array<T>

/** returns a signal that contains an array and mocks acting like an array to support root array functionality */
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
  const editors = ['push', 'pop', 'splice', 'shift', 'unshift']
  const readers = ['map', 'reduce', 'forEach', 'every']

  const overwriteEmitter = (action: string) => {
    return (resignal as any)[action] = (...args: any[]) => {
        const result = sig.value[action](...args)
        sig.emit( sig.value )
        return result
    }
  }

  const resignal = new Proxy(sig, {
    get(target, prop) {
      // If accessing numeric index like '0', '1', etc.
      if (!isNaN(prop as any)) {
        return sig.value[prop];
      }

      if(prop === 'length') {
        return sig.value.length
      }

      if(editors.includes(prop as string)) {
        return overwriteEmitter(prop as string)
        // return sig.value[prop]
      }

      if(readers.includes(prop as string)) {
        return sig.value[prop].bind(sig.value)
      }

      return (sig as any)[prop]
    },
    set(target, prop, value) {
      if (!isNaN(prop as any)) {
        sig.value[prop] = value
        sig.emit( sig.value )
        return true;
      }

      if(prop === 'length') {
        sig.value.length = value
        sig.emit( sig.value )
        return true
      }

      // Applies to the signal and not the signal.value array
      ;(sig as any)[prop] = value

      return true;
    }
  })

  return resignal as any
}
