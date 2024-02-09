import { Counts } from "./interpolateTemplate.js"

export function elementInitCheck(
  nextSibling: Element | ChildNode,
  counts: Counts
) {
  const onInitDoubleWrap = (nextSibling as any).oninit
  if (!onInitDoubleWrap) {
      return
  }

  const onInitWrap = onInitDoubleWrap.tagFunction
  if (!onInitWrap) {
      return
  }
  
  const onInit = onInitWrap.tagFunction
  if (!onInit) {
      return
  }
  
  const event = { target: nextSibling, stagger: counts.added } as unknown as Event
  onInit(event)
  ++counts.added
}
