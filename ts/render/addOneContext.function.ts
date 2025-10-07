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
    updateCount: 0,
    value,
    destroy$: new Subject<void>(),
    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement,
    parentContext,

    // TODO: remove with html``
    // valueIndex: contexts?.length || -1, // when -1 its a raw bolt value
    valueIndex: contexts.length
  }

  contexts.push(contextItem)

  return contextItem
}
