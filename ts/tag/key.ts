import { ToTag } from "./tag.types"

/** Used to give unique value to an array of tag content. Should not be an object */
export function key(arrayValue: string | number | null) {
  return {
    /*
    get tag() {
      return _tag;  // Getter for tag, returns the current value of _tag
    },
    */
    set html(newValue: ToTag) {
      newValue.arrayValue = arrayValue
    }
  }
}
