import { destroyArrayItem } from'./update/compareArrayItems.function.js'
import { ContextItem } from './ContextItem.type.js'

export function destroyArrayContext(
  subject: ContextItem,
) {
  const lastArray = subject.lastArray as unknown[]
  destroyArray(subject, lastArray)
}

/** Deletes entire array context not just one */
export function destroyArray(
  subject: ContextItem,
  lastArray: any[]
) {  
  for (let index=0; index < lastArray.length; ++index) {
    destroyArrayItem(lastArray[index])
  }
  
  delete subject.lastArray
}
