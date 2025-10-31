import { SupportContextItem } from '../index.js'
import { Subject } from '../subject/Subject.class.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js'

export function getNewContext(
  value: unknown,
  contexts: ContextItem[],
  withinOwnerElement: boolean,
  parentContext: ContextItem,
) {
  const contextItem: ContextItem = {
    updateCount: 0,
    value,
    destroy$: new Subject<void>(),
    render$: new Subject<void>(),
    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement,
    
    parentContext,

    // TODO: remove with html``
    // valueIndex: contexts?.length || -1, // when -1 its a raw bolt value
    // valueIndex: contexts.length
    valueIndex: (parentContext as SupportContextItem).varCounter,
  }

  return contextItem
}

/** auto adds onto parent.contexts */
export function addOneContext(
  value: unknown,
  contexts: ContextItem[],
  withinOwnerElement: boolean,
  parentContext: ContextItem,
): ContextItem {
  const contextItem = getNewContext(
    value,
    contexts,
    withinOwnerElement,
    parentContext,
  )

  contexts.push(contextItem)
  ++(parentContext as SupportContextItem).varCounter

  return contextItem
}
