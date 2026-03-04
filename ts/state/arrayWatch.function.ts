import { AnySupport, Callback, ContextItem, getContextInCycle } from '../index.js'
import { findStateSupportUpContext } from '../interpolations/attributes/getSupportWithState.function.js'
import { renderTagUpdateArray } from '../interpolations/attributes/renderTagArray.function.js'
import { SignalArray } from './array.function.js'
import { Signal, SignalObject } from './signal.function.js'

/** Changes in supplied array will cause calling tag to render */
export function arrayWatch<T>(
  initialValue: T[] = [],
  onChange?: (array: T[]) => any,
): SignalArray<T> {
  const context = getContextInCycle() as ContextItem
  return firstSignal(Signal(initialValue), context, onChange)
}

function firstSignal(
  sig: SignalObject<any>,
  context: ContextItem,
  onChange: any = () => undefined,
) {
  const editorNames = new Set(['push', 'pop', 'splice', 'shift', 'unshift'])
  const readerNames = new Set(['map', 'reduce', 'forEach', 'every', 'filter'])
  const editorWrappers = new Map<PropertyKey, (...args: any[]) => any>()
  const readerWrappers = new Map<PropertyKey, (...args: any[]) => any>()

  const render = () => {
    const support = findStateSupportUpContext(context) as AnySupport
    onChange( sig.value )
    renderTagUpdateArray([support])
  }

  const emitAndRender = () => {
    sig.emit(sig.value)
    render()
  }

  const getEditorWrapper = (action: string): ((...args: any[]) => any) => {
    const existing = editorWrappers.get(action)
    if(existing) {
      return existing
    }

    const wrapped = (...args: any[]) => {
      const result = sig.value[action](...args)
      emitAndRender()
      return result
    }

    editorWrappers.set(action, wrapped)
    return wrapped
  }

  const getReaderWrapper = (action: string): ((...args: any[]) => any) => {
    const existing = readerWrappers.get(action)
    if(existing) {
      return existing
    }

    const wrapped = sig.value[action].bind(sig.value)
    readerWrappers.set(action, wrapped)
    return wrapped
  }

  const resignal: any = new Proxy(sig, {
    get(target, prop) {
      if (isArrayIndex(prop)) {
        return sig.value[prop]
      }

      if(prop === 'length') {
        return sig.value.length
      }

      if(typeof prop === 'string' && editorNames.has(prop)) {
        return getEditorWrapper(prop)
      }

      if(typeof prop === 'string' && readerNames.has(prop)) {
        return getReaderWrapper(prop)
      }

      return (sig as any)[prop]
    },
    set(target, prop, value) {
      if (isArrayIndex(prop)) { // array[index] setting
        sig.value[prop] = value
        emitAndRender()
        return true;
      }

      if(prop === 'length') {
        sig.value.length = value
        emitAndRender()
        return true
      }

      // Applies to the signal and not the signal.value array
      ;(sig as any)[prop] = value

      return true;
    }
  })

  return resignal as any
}

function isArrayIndex(prop: PropertyKey): boolean {
  if(typeof prop === 'number') {
    return Number.isInteger(prop) && prop >= 0
  }

  if(typeof prop !== 'string' || prop === '') {
    return false
  }

  const asNumber = Number(prop)
  return Number.isInteger(asNumber) && asNumber >= 0 && String(asNumber) === prop
}
