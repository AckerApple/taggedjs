// taggedjs-no-compile

import { setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { AnySupport } from '../../tag/index.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { getNewContext } from '../addOneContext.function.js'
import { TagVarIdNum } from './getTagJsVar.function.js'
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'

/** adds onto parent.contexts */
export function processTagJsVarAttribute(
  value: string | TagVarIdNum | null | undefined,
  contexts: ContextItem[],
  parentContext: ContextItem,
  tagJsVar: TagJsVar,
  varIndex: number,
  support: AnySupport,
  attrName: string | TagVarIdNum,
  element: HTMLElement,
  isNameVar: boolean,
) {
  // getOneContext
  const contextItem = getNewContext(
    value,
    contexts || [],
    true,
    parentContext,
  ) as any as AttributeContextItem

  contextItem.target = element
  contextItem.valueIndex = varIndex

  contextItem.isAttr = true
  contextItem.isNameOnly = isNameVar

  contextItem.stateOwner = getSupportWithState(support)
  contextItem.supportOwner = support

  setContextInCycle(contextItem)

  tagJsVar.processInitAttribute(
    attrName as string,
    value, // tagJsVar,
    element,
    tagJsVar,
    contextItem,
    support,
    setNonFunctionInputValue,
  )

  removeContextInCycle()

  contextItem.oldTagJsVar = contextItem.tagJsVar
  contextItem.tagJsVar = tagJsVar

  return contextItem
}
