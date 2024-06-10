import { BaseSupport, Support } from '../tag/Support.class.js'
import { setUse } from'./setUse.function.js'

function setCurrentSupport(support: BaseSupport | Support) {
  setUse.memory.childrenCurrentSupport = support as Support
}

export function children() {
  const support = setUse.memory.childrenCurrentSupport as Support
  const children = support.templater.children
  return children
}

setUse({
  beforeRender: support => setCurrentSupport(support),
  beforeRedraw: support => setCurrentSupport(support),
})
