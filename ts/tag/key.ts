import { DomTag, StringTag } from "./index.js"
import { ToTag } from "./tag.types.js"

/** Used to give unique value to an array of tag content. Should not be an object */
export function key(arrayValue: string | number | null) {
  return {
    set html(newValue: ToTag | StringTag | DomTag) {
      newValue.arrayValue = arrayValue
    }
  }
}
