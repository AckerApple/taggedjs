import { SupportContextItem } from '../SupportContextItem.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { forceUpdateExistingValue } from './forceUpdateExistingValue.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { ContextItem } from '../ContextItem.type.js'
import { TagCounts } from '../TagCounts.type.js'

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
