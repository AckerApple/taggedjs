import { SupportContextItem } from '../createHtmlSupport.function.js'
import { SupportTagGlobal, TemplaterResult } from '../getTemplaterResult.function.js'
import { processReplacementComponent } from './processFirstSubjectComponent.function.js'
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { createSupport } from '../createSupport.function.js'
import { AnySupport } from '../AnySupport.type.js'

/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function updateExistingValue(
  contextItem: ContextItem | SupportContextItem,
  newValue: TemplateValue, // newValue
  ownerSupport: AnySupport,
) {
  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return
  }

  forceUpdateExistingValue(contextItem, newValue, ownerSupport)
}

export function prepareUpdateToComponent(
  templater: TemplaterResult,
  contextItem:SupportContextItem,
  ownerSupport: AnySupport,
): void {
  const global = contextItem.global as SupportTagGlobal
  // When last value was not a component
  if(!global.newest) {
    processReplacementComponent(
      templater,
      contextItem,
      ownerSupport,
      {added:0, removed:0},
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
