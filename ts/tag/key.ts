import { ToTag } from "./tag.types"

/** Used to give unique value to an array of tag content */
export function key(arrayValue: unknown) {
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
