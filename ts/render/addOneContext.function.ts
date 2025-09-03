import { Subject } from '../subject/Subject.class.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js'

export function addOneContext(
  value: unknown,
  contexts: ContextItem[],
  withinOwnerElement: boolean,
  parentContext: ContextItem,
): ContextItem {
  const contextItem: ContextItem = {
    value,
    destroy$: new Subject<void>(),
    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement,
    parentContext,
    
    valueIndex: contexts.length, // when -1 its a raw bolt value
  }

  contexts.push(contextItem)

  return contextItem
}
