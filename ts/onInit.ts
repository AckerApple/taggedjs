import { TagSupport } from "./getTagSupport.js"
import { setUse } from "./tagRunner.js"

export type OnInitCallback = () => unknown

/** When undefined, it means a tag is being built for the first time so do run init(s) */
let initCurrentSupport: TagSupport

function setCurrentTagSupport(support: TagSupport) {
  initCurrentSupport = support
}

export function onInit(
  callback: OnInitCallback
) {
  if(!initCurrentSupport.memory.init) {
    initCurrentSupport.memory.init = callback
    callback()
  }
}

setUse({
  beforeRender: (tagSupport) => {
    setCurrentTagSupport(tagSupport)
  }
})
