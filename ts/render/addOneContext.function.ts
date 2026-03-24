import { SupportContextItem } from '../index.js'
import { Subject } from '../subject/Subject.class.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import { valueToTagJsVar } from '../TagJsTags/valueToTagJsVar.function.js'

export function getNewContext(
  value: unknown,
  contexts: ContextItem[],
  withinOwnerElement: boolean,
  parentContext: ContextItem,
  tagJsVar?: TagJsTag<any>,
) {
  const contextItem: ContextItem = {
    description: 'getNewContext',
    updateCount: 0,
    value,
    destroy$: new Subject<void>(),
    render$: new Subject<void>(),
    // paintCommands: [],
    tagJsVar: tagJsVar || valueToTagJsVar(value),
    withinOwnerElement,
    parentContext,
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
