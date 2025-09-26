// taggedjs-no-compile

import { specialAttribute } from '../../interpolations/attributes/specialAttribute.js'
import { isFunction } from '../../isInstance.js'
import { HowToSet, setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js'
import { bindSubjectCallback, Callback } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { AnySupport } from '../../tag/index.js'
import { paintContent } from '../paint.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { processNonDynamicAttr } from '../../interpolations/attributes/processNameValueAttribute.function.js'
import { addOneContext } from '../addOneContext.function.js'
import { processAttributeFunction } from '../../interpolations/attributes/processAttributeCallback.function.js'
import { processUpdateAttrContext } from './processUpdateAttrContext.function.js'
import { createDynamicArrayAttribute, createDynamicAttribute } from './createDynamicAttribute.function.js'
import { getTagJsVar, TagVarIdNum } from './getTagJsVar.function.js'
import { NoDisplayValue } from './NoDisplayValue.type.js'
import { SpecialDefinition } from './Special.types.js'
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js'
import { TemplateValue } from '../../index.js'
import { AttributeContextItem } from '../../tag/AttributeContextItem.type.js'
import { processStandAloneAttribute } from './processStandAloneAttribute.function.js'

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
  const contextItem = addOneContext(
    value,
    contexts || [],
    true,
    parentContext,
  ) as any as AttributeContextItem

  contextItem.element = element
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