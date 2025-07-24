import { SupportContextItem } from '../SupportContextItem.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'

/** Checks if value has changed before updating. Used for all tag value updates. Determines if value changed since last render */
export function tagValueUpdateHandler(
  newValue: TemplateValue, // newValue
  contextItem: ContextItem | SupportContextItem,
  ownerSupport: AnySupport,
): number {
  // Do not continue if the value is just the same
  if(newValue === contextItem.value) {
    return -1
  }

  return forceUpdateExistingValue(
    contextItem as AdvancedContextItem,
    newValue,
    ownerSupport,
  )
}
