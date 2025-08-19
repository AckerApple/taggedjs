import { state } from "./state.function.js"
import { getContextInCycle } from "../tag/cycles/setContextInCycle.function.js"
import { ContextItem } from "../tag/ContextItem.type.js"

export type OnDestroyCallback = () => unknown

export function onDestroy(
  callback: OnDestroyCallback
) {
  state(function stateDestroy() {
    const context = getContextInCycle() as ContextItem
    context.destroy$.toCallback(callback)
  })
}
