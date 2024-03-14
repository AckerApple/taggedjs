import { TagSupport } from "./TagSupport.class"
import { setUse } from "./setUse.function"

export type OnInitCallback = () => unknown

function setCurrentTagSupport(support: TagSupport) {
  setUse.memory.initCurrentSupport = support
}

export function onInit(
  callback: OnInitCallback
) {
  if(!setUse.memory.initCurrentSupport.memory.init) {
    setUse.memory.initCurrentSupport.memory.init = callback
    callback() // fire init
  }
}

setUse({
  beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
  beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
})
