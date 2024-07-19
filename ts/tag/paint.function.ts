type PaintAppend = {
  element: Text | Element
  relative: Text | Element
}

export let paintRemoves: (Element | Text | ChildNode)[] = []
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

  let d = -1
  const removeLength = paintRemoves.length - 1
  while(d++ < removeLength) {
    const toRemove = paintRemoves[d]
    const parentNode = toRemove.parentNode as ParentNode
    parentNode.removeChild(toRemove as Element)
  }

  let x = -1
  const contentLength = paintContent.length - 1
  while(x++ < contentLength) {
    paintContent[x]()
  }

  let y = -1
  const appendLength = paintAppends.length - 1
  while(y++ < appendLength) {
    const now = paintAppends[y]
    now.relative.appendChild(now.element)
  }

  let z = -1
  const insertBeforeLength = paintInsertBefores.length - 1
  while(z++ < insertBeforeLength) {
    const now = paintInsertBefores[z]
    const parentNode = now.relative.parentNode as ParentNode
    parentNode.insertBefore(now.element, now.relative)
  }


  let a = -1
  const paintAftersLength = paintAfters.length - 1
  while(a++ < paintAftersLength) {
    paintAfters[a]()
  }

  paintContent = []
  paintAppends = []
  paintInsertBefores = []
  paintRemoves = []
  paintAfters = []
}
