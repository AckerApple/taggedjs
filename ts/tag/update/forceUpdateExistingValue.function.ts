import { SupportContextItem } from '../SupportContextItem.type.js'
import { AdvancedContextItem } from '../AdvancedContextItem.type.js'
import { updateToDiffValue } from './updateToDiffValue.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { TemplateValue } from '../TemplateValue.type.js'
import { TagJsVar } from '../../tagJsVars/tagJsVar.type.js'


/** Used for all tag value updates. Determines if value changed since last render */
export function forceUpdateExistingValue(
  contextItem: AdvancedContextItem | SupportContextItem,
  newValue: TemplateValue, // newValue
  ownerSupport: AnySupport,
) {
  // Have the context check itself (avoid having to detect old value)
  const tagJsVar = contextItem.tagJsVar as TagJsVar
  const ignoreOrDestroyed = tagJsVar.checkValueChange(
    newValue,
    contextItem as unknown as SupportContextItem,
  )

  // ignore
  if(ignoreOrDestroyed === -1) {
    return // do nothing
  }

  updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed)
}
