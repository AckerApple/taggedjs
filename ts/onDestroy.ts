import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./tagRunner.js"

export type OnDestroyCallback = () => unknown

/** When undefined, it means a tag is being built for the first time so do run destroy(s) */
let destroyCurrentTagSupport: TagSupport

export function onDestroy(
  callback: OnDestroyCallback
) {
  destroyCurrentTagSupport.memory.destroyCallback = callback
}

setUse({
  beforeRender: (tagSupport) => {
    destroyCurrentTagSupport = tagSupport
  },
  beforeDestroy: (tagSupport) => {
    const callback = tagSupport.memory.destroyCallback

    if(callback) {
      callback()
    }
  }
})
