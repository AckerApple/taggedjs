type PaintAppend = {
  element: Text | Element
  relative: Text | Element
}

export let paintRemoves = [] as (Element | Text | ChildNode)[]
export let paintContent: (() => any)[] = []
export let paintAppends: PaintAppend[] = []
export let paintInsertBefores: PaintAppend[] = []
export let paintAfters: (() => any)[] = []

export const painting = {
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
  }

  ++painting.locks

  for(const toRemove of paintRemoves) {
    const parentNode = toRemove.parentNode as ParentNode
    parentNode.removeChild(toRemove as Element)
  }

  for(const content of paintContent) {
    content()
  }

  for(const now of paintAppends) {
    now.relative.appendChild(now.element)
  }

  for(const now of paintInsertBefores) {
    const parentNode = now.relative.parentNode as ParentNode
    parentNode.insertBefore(now.element, now.relative)
  }

  for(const now of paintAfters) {
    now()
  }

  paintRemoves = []
  paintContent = []
  paintAppends = []
  paintInsertBefores = []
  paintAfters = []
  --painting.locks
}
