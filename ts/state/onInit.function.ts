import { checkToResolvePromise } from '../interpolations/attributes/checkToResolvePromise.function.js'
import { getSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'
import { tag } from '../TagJsTags/tag.function.js'
import { state } from './state.function.js'

export type OnInitCallback = () => unknown

/** Used for knowing when html elements have arrived on page */
export function onInit(callback: OnInitCallback) {
  state(() => {
    const result = callback()
    const nowSupport = getSupportInCycle()

    if (!nowSupport?.context?.global) {
      return result
    }

    return checkToResolvePromise(result, nowSupport, {
      resolvePromise,
      resolveValue,
    })
  })

  return tag
}

function resolvePromise<T>(value: T) {
  return value
}

function resolveValue<T>(value: T) {
  return value
}
