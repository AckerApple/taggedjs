import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./setUse.function.js"

export type OnDestroyCallback = () => unknown

/** When undefined, it means a tag is being built for the first time so do run destroy(s) */
let destroyCurrentTagSupport: TagSupport

export function onDestroy(
  callback: OnDestroyCallback
) {
  if(!destroyCurrentTagSupport.memory) {
    console.error('xxx',destroyCurrentTagSupport)
  }

  destroyCurrentTagSupport.memory.destroyCallback = callback
}

setUse({
  beforeRender: tagSupport => destroyCurrentTagSupport = tagSupport,
  beforeRedraw: tagSupport => destroyCurrentTagSupport = tagSupport,
  beforeDestroy: (tagSupport, tag) => {
    const callback = tagSupport.memory.destroyCallback

    if(callback) {
      callback()
    }
  }
})
