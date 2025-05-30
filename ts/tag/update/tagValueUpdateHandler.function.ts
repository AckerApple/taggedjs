import { SupportContextItem } from '../SupportContextItem.type.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { updateExistingTagComponent } from '../../render/update/updateExistingTagComponent.function.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagCounts } from '../TagCounts.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'

/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(
  newValue: TemplateValue, // newValue
  ownerSupport: AnySupport,
  contextItem: ContextItem | SupportContextItem,
  _values: any[],
  counts: TagCounts,
) {
  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return
  }

  forceUpdateExistingValue(
    contextItem as AdvancedContextItem,
    newValue,
    ownerSupport,
    counts,
  )
}

export function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem:SupportContextItem,
  ownerSupport: AnySupport,
  counts: TagCounts,
): void {
  const global = contextItem.global as SupportTagGlobal
  // When last value was not a component
  if(!global.newest) {
    ;(templater as TagJsVar).processInit(
      templater,
      contextItem,
      ownerSupport,
      counts,
      undefined, // appendTo,
      contextItem.placeholder,
    )
    return
  }

  const support = createSupport(
    templater,
    ownerSupport,
    ownerSupport.appSupport,
    contextItem,
  )

  updateExistingTagComponent(
    ownerSupport,
    support, // latest value
    contextItem,
  )
}
