import { BaseTagSupport, TagSupport } from "../tag/TagSupport.class"
import { setUse } from "./setUse.function"

export type OnDestroyCallback = () => unknown

function setCurrentTagSupport(support: BaseTagSupport | TagSupport) {
  setUse.memory.destroyCurrentSupport = support as TagSupport
}

export function onDestroy(
  callback: OnDestroyCallback
) {
  const tagSupport = setUse.memory.destroyCurrentSupport as TagSupport
  tagSupport.global.destroyCallback = callback
}

setUse({
  beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
  beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
  beforeDestroy: (tagSupport) => {
    const callback = tagSupport.global.destroyCallback

    if(callback) {
      callback()
    }
  }
})

