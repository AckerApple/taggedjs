import { AnySupport } from "../tag/AnySupport.type.js"
import { SupportTagGlobal } from "../tag/getTemplaterResult.function.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { state } from "./state.function.js"

export type OnDestroyCallback = () => unknown

export function onDestroy(
  callback: OnDestroyCallback
) {
  state(function stateDestroy() {
    const support = getSupportInCycle() as AnySupport
    const global = support.subject.global as SupportTagGlobal
    global.destroy$.toCallback(callback)
  })
}
