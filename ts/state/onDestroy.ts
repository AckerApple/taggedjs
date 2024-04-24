import { BaseTagSupport } from "../TagSupport.class"
import { setUse } from "./setUse.function"

export type OnDestroyCallback = () => unknown

/** When undefined, it means a tag is being built for the first time so do run destroy(s) */
let destroyCurrentTagSupport: BaseTagSupport

export function onDestroy(
  callback: OnDestroyCallback
) {
  destroyCurrentTagSupport.global.destroyCallback = callback
}

setUse({
  beforeRender: tagSupport => destroyCurrentTagSupport = tagSupport,
  beforeRedraw: tagSupport => destroyCurrentTagSupport = tagSupport,
  beforeDestroy: (tagSupport, tag) => {
    const callback = tagSupport.global.destroyCallback

    if(callback) {
      callback()
    }
  }
})
