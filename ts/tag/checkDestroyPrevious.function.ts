import { isArray } from'../isInstance.js'
import { ContextItem } from './ContextItem.type.js'

export function checkArrayValueChange(
  newValue: unknown,
  _subject: ContextItem,
) {
  // no longer an array?
  if (!isArray(newValue)) {
    // destroyArrayContext(subject)
    return 9 // 'array'
  }

  return 0
}
