import { destroyArrayItem } from'./update/compareArrayItems.function.js'
import { ContextItem } from './ContextItem.type.js'

export function destroyArrayContext(
  context: ContextItem,
) {
  ++context.updateCount
  const lastArray = context.lastArray as unknown[]
  destroyArray(context, lastArray)
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
