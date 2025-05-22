import { destroyArrayItem } from'./update/compareArrayItems.function.js'
import { isArray } from'../isInstance.js'
import { ContextItem } from './ContextItem.type.js'

export function checkArrayValueChange(
  newValue: unknown,
  subject: ContextItem,
) {  
  // no longer an array?
  if (!isArray(newValue)) {
    destroyArrayContextItem(subject)

    return 9 // 'array'
  }

  return false
}

export function destroyArrayContextItem(
  subject: ContextItem,
) {
  const lastArray = subject.lastArray as unknown[]
  destroyArray(subject, lastArray)
}

export function destroyArray(
  subject: ContextItem,
  lastArray: any[]
) {
  const counts = {added:0, removed:0}
  
  for (let index=0; index < lastArray.length; ++index) {
    destroyArrayItem(lastArray[index], counts)
  }
  
  delete subject.lastArray
}
