import { isArray } from'../isInstance.js'
import { ContextItem } from './ContextItem.type.js'
import { destroyArrayContext } from './destroyArrayContext.function.js'

export function checkArrayValueChange(
  newValue: unknown,
  subject: ContextItem,
) {
  // no longer an array?
  if (!isArray(newValue)) {
    destroyArrayContext(subject)
    return 9 // 'array'
  }

  return -1
}
