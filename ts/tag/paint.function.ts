type PaintAppend = {
  element: Text | Element
  relative: Text | Element
}

export let paintRemoves = [] as (Element | Text | ChildNode)[]
export let paintContent: (() => any)[] = []
export let setContent: [string, Text][] = []

/** array memory that runs and completes BEFORE paintInsertBefores array */
export let paintAppends: PaintAppend[] = []

/** array memory that runs and completes AFTER paintAppends array */
export let paintInsertBefores: PaintAppend[] = []

export let paintAfters: (() => any)[] = [] // callbacks after all painted

export const painting = {
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
  }

  for (let index = paintRemoves.length - 1; index >= 0; --index) {
    const toRemove = paintRemoves[index]
    const parentNode = toRemove.parentNode as ParentNode
    parentNode.removeChild(toRemove as Element)
  }

  for(const content of paintContent) {
    content()
  }

  for(const [text, textNode] of setContent) {
    textNode.textContent = text
  }

  for(const now of paintAppends) {
    now.relative.appendChild(now.element)
  }

  for(const { element, relative } of paintInsertBefores) {
    (relative.parentNode as ParentNode).insertBefore(element, relative)
  }

  paintRemoves = []
  paintContent = []
  paintAppends = []
  paintInsertBefores = []
  setContent = []

  for(const now of paintAfters) {
    now()
  }

  paintAfters = []
}
