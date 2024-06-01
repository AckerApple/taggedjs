import { state } from './state.function.js'

export type OnInitCallback = () => unknown

/** runs a callback function one time and never again. Same as calling state(() => ...) */
export function onInit(
  callback: OnInitCallback
) {
  state(callback)
}
