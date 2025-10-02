import { HowToSet } from './howToSetInputValue.function.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { BaseContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/index.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'
import { blankHandler } from '../../render/dom/blankHandler.function.js'
import { Subject, valueToTagJsVar } from '../../index.js'

/** Used for bolts like div.style(() => {{backgroundColor:}}) */
export function processFunctionAttr(
  value: never,
  parentContext: ContextItem, // parent context
  attrName: string,
  element: HTMLElement,
  howToSet: HowToSet,
) {
  const innerValue = (value as any)()

  const tagJsVarOverride: TagJsVar = {
    tagJsType: 'dynamic-attr',
    hasValueChanged: (
      _value: unknown,
      _contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      const newValue = (value as any)()
      return subContext.tagJsVar.hasValueChanged(
        newValue,
        subContext,
        ownerSupport,
      )
    },
    processInit: blankHandler,
    processInitAttribute: blankHandler,
    destroy: (
      _contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      subContext.tagJsVar.destroy(subContext, ownerSupport)
    },
    processUpdate: (
      value: any,
      contextItem: ContextItem,
      ownerSupport: AnySupport,
      values: unknown[],
    ) => {
      ++contextItem.updateCount

      const newValue = (value as any)()
      // const oldValue = subContext.value
      // const newTagJsVar = valueToTagJsVar(newValue)

      subContext.tagJsVar.processUpdate(
        newValue, // newTagJsVar as any,
        subContext,
        ownerSupport,
        values
      )

      subContext.value = newValue
    }
  }

  const subContext: BaseContextItem = {
    updateCount: 0,
    isAttr: true,
    element,
    parentContext,
    value: innerValue, // used for new value comparing
    tagJsVar: valueToTagJsVar(innerValue),

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }

  const contextItem: BaseContextItem = {
    updateCount: 0,
    isAttr: true,
    contexts: [subContext],
    element,
    parentContext,
    value,
    tagJsVar: tagJsVarOverride,

    // TODO: Not needed
    valueIndex: -1,
    withinOwnerElement: true,
    destroy$: new Subject(),
  }

  subContext.tagJsVar.processInitAttribute(
    attrName,
    innerValue,
    element,
    subContext.tagJsVar,
    subContext,
    {} as AnySupport,
    howToSet,
  )

  return contextItem
}