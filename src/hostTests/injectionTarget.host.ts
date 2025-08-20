import { host, tag } from "taggedjs"
import { injectionWrap } from "./injectionWrap.host"

export const injectionTarget = host((
  value: any
) => {
  const wrapHost = tag.inject(injectionWrap)
  
  tag
  .onInit(() => wrapHost.targets.push(value))
  .onDestroy(() => {
    const index = wrapHost.targets.findIndex((x: any) => x === value)
    if (index !== -1) {
      wrapHost.targets.splice(index, 1)
    }
  })
  .element
  .onclick(() => {
    const index = wrapHost.selected.findIndex((x: any) => x === value)
    if (index !== -1) {
      wrapHost.selected.splice(index, 1)
    } else {
      wrapHost.selected.push(value)
    }
  })
})