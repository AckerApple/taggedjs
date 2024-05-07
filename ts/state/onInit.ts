import { BaseTagSupport, TagSupport } from "../TagSupport.class"
import { setUse } from "./setUse.function"

export type OnInitCallback = () => unknown

function setCurrentTagSupport(support: BaseTagSupport | TagSupport) {
  setUse.memory.currentSupport = support as TagSupport
}

export function onInit(
  callback: OnInitCallback
) {
  const tagSupport = setUse.memory.currentSupport
  if(!tagSupport.global.init) {
    tagSupport.global.init = callback
    callback() // fire init
  }
}

setUse({
  beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
  beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
})
