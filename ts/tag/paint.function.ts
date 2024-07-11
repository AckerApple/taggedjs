export const paintContent: (() => any)[] = []
export const paintAppends: (() => any)[] = []
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
    (paintAppends.shift() as any)()
  }
}