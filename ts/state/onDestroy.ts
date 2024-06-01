import { TagSupport } from "../tag/TagSupport.class.js"
import { getSupportInCycle } from "../tag/getSupportInCycle.function.js"
import { state } from "./state.function.js"

export type OnDestroyCallback = () => unknown

export function onDestroy(
  callback: OnDestroyCallback
) {
  state(() => {
    const tagSupport = getSupportInCycle() as TagSupport
    tagSupport?.global.destroy$.toCallback(callback)
  })
}
