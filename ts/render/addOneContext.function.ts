import { ContextItem } from '../tag/ContextItem.type.js'
import { valueToTagJsVar } from '../tagJsVars/valueToTagJsVar.function.js'

export function addOneContext(
  value: unknown,
  context: ContextItem[],
  withinOwnerElement: boolean,
  parentContext: ContextItem,
): ContextItem {
  const contextItem: ContextItem = {
    value,
    valueIndex: context.length,
    valueIndexSetBy: 'addOneContext',

    tagJsVar: valueToTagJsVar(value),
    withinOwnerElement,
    parentContext,
  }

  context.push(contextItem)

  return contextItem
}
