import { paintAppend, paintAppends } from '../render/paint.function.js'
import { empty } from './ValueTypes.enum.js'

export function guaranteeInsertBefore(
  appendTo?: Element,
  insertBefore?: Text, // optional but will always be made
): {insertBefore: Text, appendMarker: Text | undefined} {
  let appendMarker: Text | undefined

  // do we need to append now but process subscription later?
  if(appendTo) {
    appendMarker = insertBefore = document.createTextNode(empty)

    paintAppends.push({
      processor: paintAppend,
      args: [appendTo, insertBefore]
    })
  }

  return {
    appendMarker,
    insertBefore: insertBefore as Text,
  }
}
