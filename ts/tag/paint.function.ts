export const paintContent: (() => any)[] = []
type PaintAppend = {
  element: Text | Element
  relative: Text | Element
}

export const paintAppends: PaintAppend[] = []
export const paintInsertBefores: PaintAppend[] = []

export const painting = {
  paintContent,
  paintAppends,
  paintInsertBefores,
  locks: 0
}

export function paint() {
  if(painting.locks > 0) {
    return
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

  paintContent.length = 0
  paintAppends.length = 0
  paintInsertBefores.length = 0
}
