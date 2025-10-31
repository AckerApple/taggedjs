import { host, tag } from "taggedjs"
import { injectionWrap } from "./injectionWrap.host.js"
import { getContextInCycle } from "taggedjs"

export const injectionTarget = host((
  value: any
) => {
  const context = getContextInCycle()
  const wrapHost = tag.inject(injectionWrap)
  
  tag
  .onInit(() => {
    wrapHost.targets.push(value)
  })
  .onDestroy(() => {
    const index = wrapHost.targets.findIndex((x: any) => x === value)
    if (index !== -1) {
      wrapHost.targets.splice(index, 1)
    }
  })

  const element = tag.element

  element.onclick(() => {
    const index = wrapHost.selected.findIndex((x: any) => x === value)
    if (index !== -1) {
      wrapHost.selected.splice(index, 1)
    } else {
      wrapHost.selected.push(value)
    }
  })
})