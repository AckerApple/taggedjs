import { AnySupport, SupportContextItem, tag } from '../index.js'
import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { getContextInCycle } from '../tag/cycles/setContextInCycle.function.js'
import { state } from './state.function.js'

export type OnInitCallback = () => unknown

/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function onInit(
  callback: OnInitCallback
) {
  state(() => {
    const result = callback()
    const context = getContextInCycle() as SupportContextItem
    
    if( context.global ) {
      const nowSupport = getSupportInCycle() as AnySupport
      return checkToResolvePromise(
        result,
        nowSupport,
        { resolvePromise, resolveValue },
      )
    }
  })

  return tag
}

function resolvePromise(x: any) {
  return x
}

function resolveValue(x: any) {
  return x
}
