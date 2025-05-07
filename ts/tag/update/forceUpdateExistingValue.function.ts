import { SupportContextItem } from '../createHtmlSupport.function.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { ContextItem } from '../Context.types.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'
import { AnySupport } from '../AnySupport.type.js'


/** Used for all tag value updates. Determines if value changed since last render */
export function forceUpdateExistingValue(
  contextItem: ContextItem | SupportContextItem,
  newValue: TemplateValue, // newValue
  ownerSupport: AnySupport,
) {
  // Have the context check itself (avoid having to detect old value)
  const ignoreOrDestroyed = contextItem.checkValueChange(
    newValue,
    contextItem as unknown as SupportContextItem,
  )

  // ignore
  if(ignoreOrDestroyed === -1) {
    return // do nothing
  }

  updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed)
}
