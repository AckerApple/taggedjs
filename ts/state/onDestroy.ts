import { Support } from "../tag/Support.class.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { state } from "./state.function.js"

export type OnDestroyCallback = () => unknown

export function onDestroy(
  callback: OnDestroyCallback
) {
  state(() => {
    const support = getSupportInCycle() as Support
    support?.subject.global.destroy$.toCallback(callback)
  })
}
