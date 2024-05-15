import { InputElementTargetEvent } from "./ElementTargetEvent.interface"
import { Counts } from "./interpolateTemplate"

export function elementInitCheck(
  nextSibling: Element | ChildNode,
  counts: Counts
) {
  const onInitDoubleWrap = (nextSibling as any).oninit
  if (!onInitDoubleWrap) {
    return counts.added
  }

  const onInitWrap = onInitDoubleWrap.tagFunction
  if (!onInitWrap) {
    return counts.added
  }
  
  const onInit = onInitWrap.tagFunction
  if (!onInit) {
    return counts.added
  }
  
  const event = { target: nextSibling, stagger: counts.added } as unknown as InputElementTargetEvent
  onInit(event)
  
  return ++counts.added
}
