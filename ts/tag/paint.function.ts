export const paintContent: (() => any)[] = []
type PaintAppend = {
  isAppend?: true
  element: Text | Element
  relative: Text | Element
}
export const paintAppends: PaintAppend[] = []
export const painting = {
  paintContent,
  paintAppends,
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
  }

  while(paintContent.length) {
    (paintContent.shift() as any)()
  }

  while(paintAppends.length) {
    const now = paintAppends.shift() as PaintAppend
    
    if(now.isAppend) {
      now.relative.appendChild(now.element)
      continue
    }
    
    const parentNode = now.relative.parentNode as ParentNode
    parentNode.insertBefore(now.element, now.relative)
  }
}
