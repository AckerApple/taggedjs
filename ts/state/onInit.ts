import { AnySupport } from '../index.js'
import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js'
import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { state } from './state.function.js'

export type OnInitCallback = () => unknown

/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function onInit(
  callback: OnInitCallback
) {
  state(() => {
    const result = callback()
    const nowSupport = getSupportInCycle() as AnySupport
    return checkToResolvePromise(
      result,
      nowSupport,
      nowSupport.subject.global,
      'onInit',
      { resolvePromise, resolveValue },
    )
  })
}

function resolvePromise(x: any) {
  return x
}

function resolveValue(x: any) {
  return x
}
