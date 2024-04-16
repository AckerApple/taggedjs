import { BaseTagSupport } from "../TagSupport.class"
import { TemplaterResult } from "../TemplaterResult.class"
import { setUse } from "./setUse.function"

export type OnInitCallback = () => unknown

function setCurrentTagSupport(support: BaseTagSupport) {
  setUse.memory.initCurrentTemplater = support.templater
}

export function onInit(
  callback: OnInitCallback
) {
  const templater = setUse.memory.initCurrentTemplater as TemplaterResult
  if(!(templater.global as any).init) {
    ;(templater.global as any).init = callback
    callback() // fire init
  }
}

setUse({
  beforeRender: tagSupport => setCurrentTagSupport(tagSupport),
  beforeRedraw: tagSupport => setCurrentTagSupport(tagSupport),
})
